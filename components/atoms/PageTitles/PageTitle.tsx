export type PageTitleProps = {
  title: string;
  subTitle?: string;
};

const PageTitle = ({ title, subTitle }: PageTitleProps) => {
  return (
    <div className='flex flex-col gap-[11px]'>
      <span className='text-black text-2xl font-semibold max-w-[280px] whitespace-pre'>
        {title}
      </span>
      {subTitle && (
        <span className='text-darkGray text-[15px] font-semibold max-w-[320px]  whitespace-pre'>
          {subTitle}
        </span>
      )}
    </div>
  );
};

export default PageTitle;
