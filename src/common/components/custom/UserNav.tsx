import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
} from '@/common/components/ui/dropdown-menu';
import { Button } from '@/common/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/common/components/ui/avatar';

import { LogoutButton } from '@/modules/auth';

export const UserNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-9 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Avatar className="size-9">
            <AvatarImage src="" alt="@entomon" />
            <AvatarFallback>EP</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Entomon Institite</p>
            <p className="text-xs leading-none text-muted-foreground">entomoninstitute@gmail.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/admin/dashboard" className="w-full cursor-pointer">
              Profile
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/admin/settings" className="w-full cursor-pointer">
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton>Logout</LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
