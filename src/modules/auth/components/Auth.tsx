import Image from 'next/image';

import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const Auth = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <SignupForm />
      {/* <LoginForm /> */}

      <div className="hidden bg-muted lg:block">
        <Image
          alt="Image"
          width="1920"
          height="1080"
          src="https://bijlmakers.com/wp-content/uploads/2018/10/potato-beetle-2766872_1920-700x554.jpg"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};
