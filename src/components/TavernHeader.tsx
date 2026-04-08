type TavernHeaderProps = {
    title: string;
    children: React.ReactNode;
  };
  
  function TavernHeader({ title, children }: TavernHeaderProps) {
    return (
      <header className="tavern-header">
        <h1>{title}</h1>
        {children}
      </header>
    );
  }

  export default TavernHeader