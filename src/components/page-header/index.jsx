function PageHeader({ title, description, action }) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-6 pt-10 sm:flex-row sm:items-end sm:justify-between sm:pt-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="flex shrink-0 items-center">{action}</div> : null}
    </div>
  );
}

export default PageHeader;
