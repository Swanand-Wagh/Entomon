'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Icon } from '@/constants/icons';
import { Row } from '@tanstack/react-table';
import { CustomModal } from '../CustomModal';
import { useAction } from 'next-safe-action/hooks';
import { deleteBlogAdmin } from '@/features/blog/server/actions';
import { AdminBlogsColumns } from '@/features/blog/components/columns';
import { AdminEventsColumns } from '@/features/events/components/columns';
import { AdminCoursesColumns } from '@/features/courses/components/columns';

type ActionProps = {
  row: Row<AdminBlogsColumns | AdminCoursesColumns | AdminEventsColumns>;
  route: string;
};

const DeleteAction = ({ row, route }: ActionProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { execute } = useAction(deleteBlogAdmin);

  const handleDelete = () => {
    setDialogOpen(false);
    execute({ slug: row.original.slug });
  };

  return (
    <>
      <span onClick={() => setDialogOpen(true)}>
        <Icon name="delete" className="h-5 w-5 cursor-pointer text-red-500" />
      </span>
      <CustomModal
        open={isDialogOpen}
        onConfirm={handleDelete}
        onOpenChange={setDialogOpen}
        confirmButtonVariant="destructive"
        title="Confirm Deletion"
        confirmButtonLabel="Delete"
        cancelButtonLabel="Cancel"
        description="Are you sure you want to delete this item? This action cannot be undone!"
      />
    </>
  );
};

const EditAction = ({ row, route }: ActionProps) => {
  const session = useSession();
  if (row.original.userId === session.data?.user.id)
    return (
      <Link href={`/admin/${route}/edit/${encodeURIComponent(row.original.slug)}`}>
        <Icon name="edit" className="h-5 w-5 cursor-pointer" />
      </Link>
    );
  return null;
};

const ACTION_COMPONENTS = {
  delete: DeleteAction,
  edit: EditAction,
};

type ActionsCellProps = {
  actions: ('delete' | 'edit')[];
  row: any;
  route: string;
};

export const ActionsCell = ({ actions, row, route }: ActionsCellProps) => {
  return (
    <div className="flex items-center space-x-4">
      {actions.map((action) => {
        const ActionComponent = ACTION_COMPONENTS[action];
        return <ActionComponent key={action} row={row} route={route} />;
      })}
    </div>
  );
};
