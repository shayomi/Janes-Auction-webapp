const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center min-h-screen w-full items-center bg-dark-4 ">
      {children}
    </div>
  );
};

export default Layout;
