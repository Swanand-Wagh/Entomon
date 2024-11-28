import { Footer, Navbar } from '@/common/components/custom';

export default function UserBlogsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
