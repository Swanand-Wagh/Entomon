'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/common/components/ui/input';
import { Button } from '@/common/components/ui/button';
import { Textarea } from '@/common/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/common/components/ui/form';

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} className={fieldState.invalid ? 'border-red-500' : ''} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="you@example.com"
                  className={fieldState.invalid ? 'border-red-500' : ''}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Phone (optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Your phone number"
                  className={fieldState.invalid ? 'border-red-500' : ''}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  placeholder="Your message"
                  className={fieldState.invalid ? 'border-red-500' : ''}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
          Send Message
        </Button>
      </form>
    </Form>
  );
}
