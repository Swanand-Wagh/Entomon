'use client';

import * as z from 'zod';
import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormError, FormSuccess } from '@/components/custom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAction } from 'next-safe-action/hooks';
import { eventRegistrationSchema } from '../schema/event';
import { getCurrentEventRegistration, registerUserForEvent, unregisterUserForEvent } from '../server/actions';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { EventDataType } from '../types/event';
import { useRazorpayPayment } from '@/features/razorpay/hooks/useRazorpayPayment';
import { RefundMessage } from '@/features/events/components/RefundMessage';

type RegistrationEvent = Pick<EventDataType, 'id' | 'slug' | 'price' | 'status'>;
type RegistrationLookup = { key: string; isRegistered?: boolean; error?: string };

export const RegistrationForm = ({ eventData }: { eventData: RegistrationEvent }) => {
  const { data: session, status: sessionStatus } = useSession();
  const userId = session?.user?.id ?? '';
  const [revision, setRevision] = useState(0);
  const [lookup, setLookup] = useState<RegistrationLookup | null>(null);
  const lookupKey = `${userId}:${eventData.id}:${revision}`;
  const refreshRegistration = useCallback(() => setRevision((value) => value + 1), []);

  useEffect(() => {
    if (sessionStatus !== 'authenticated' || !userId) {
      setLookup(null);
      return;
    }
    let active = true;

    const loadRegistration = async () => {
      try {
        const result = await getCurrentEventRegistration({ eventId: eventData.id });
        if (!active) return;
        if (typeof result?.data?.isRegistered !== 'boolean') {
          setLookup({ key: lookupKey, error: result?.serverError?.toString() ?? 'Unable to load registration status.' });
          return;
        }
        setLookup({ key: lookupKey, isRegistered: result.data.isRegistered });
      } catch {
        if (active) setLookup({ key: lookupKey, error: 'Unable to load registration status.' });
      }
    };

    void loadRegistration();
    return () => { active = false; };
  }, [sessionStatus, userId, eventData.id, lookupKey]);

  const isAuthenticated = sessionStatus === 'authenticated';
  if (sessionStatus === 'loading' || (isAuthenticated && lookup?.key !== lookupKey)) {
    return <Button className="w-full" disabled isLoading loadingText="Loading registration...">Loading registration...</Button>;
  }

  if (isAuthenticated && lookup?.error) {
    return (
      <>
        <FormError message={lookup.error} />
        <Button className="w-full" onClick={refreshRegistration}>Retry registration status</Button>
      </>
    );
  }

  return (
    <RegistrationFields
      key={`${userId}:${eventData.id}`}
      userId={userId}
      isAuthenticated={isAuthenticated}
      isRegistered={isAuthenticated && lookup?.isRegistered === true}
      eventData={eventData}
      onRegistrationChange={refreshRegistration}
    />
  );
};

const RegistrationFields = ({
  userId,
  isRegistered,
  isAuthenticated,
  eventData,
  onRegistrationChange,
}: {
  userId: string;
  isRegistered: boolean;
  isAuthenticated: boolean;
  eventData: RegistrationEvent;
  onRegistrationChange: () => void;
}) => {
  const { slug, id, price, status } = eventData;
  const isPaid = parseInt(price) > 0;
  const { executeAsync: register, result: registerResult, isPending: isRegistering } = useAction(registerUserForEvent);
  const { executeAsync: unregister, result: unregisterResult, isPending: isUnregistering } = useAction(unregisterUserForEvent);

  const form = useForm<z.infer<typeof eventRegistrationSchema>>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: { eventSlug: slug, phone: '' },
  });

  const { isProcessing, paymentStatus, handlePayment } = useRazorpayPayment({
    eventRegistration: form.watch(),
    eventId: id,
    userId,
    amount: parseInt(price),
  });

  const onRegisterSubmit = async (values: z.infer<typeof eventRegistrationSchema>) => {
    if (!isAuthenticated) return;
    form.clearErrors();
    if (isPaid) {
      await handlePayment();
    } else {
      const result = await register(values);
      if (result?.data?.success) {
        form.reset();
        onRegistrationChange();
      }
    }
  };

  useEffect(() => {
    if (paymentStatus === 'success') onRegistrationChange();
  }, [paymentStatus, onRegistrationChange]);

  const onUnregisterSubmit = async () => {
    const result = await unregister({ slug });
    if (result?.data?.success) onRegistrationChange();
  };

  if (isRegistered) {
    if (isPaid) return <RefundMessage />;
    return (
      <>
        <FormError message={unregisterResult.serverError?.toString()} />
        <Button onClick={onUnregisterSubmit} className="w-full" disabled={isUnregistering} isLoading={isUnregistering} loadingText="Processing...">
          Unregister from Event
        </Button>
      </>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onRegisterSubmit)} className="grid gap-4">
        <FormField
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  disabled={isRegistered || isRegistering || isProcessing}
                  placeholder="+91 1234567890"
                  className={fieldState.invalid ? 'border-red-500' : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={registerResult.serverError?.toString()} />
        <FormSuccess message={registerResult?.data?.success} />
        <Button
          type="submit"
          className="w-full"
          isLoading={isRegistering || isProcessing}
          loadingText={isPaid ? 'Processing payment...' : 'Registering...'}
          disabled={!isAuthenticated || isRegistering || isProcessing || status === 'PAUSED' || status === 'COMPLETED'}
        >
          {status === 'COMPLETED'
            ? 'Event Completed'
            : status === 'PAUSED'
              ? 'Registrations are Paused'
              : 'Register for Event'}
        </Button>
      </form>
    </Form>
  );
};
