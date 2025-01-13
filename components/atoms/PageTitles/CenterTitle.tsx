import { PageTitleProps } from './PageTitle';

const CenterTitle = ({ title, subTitle }: PageTitleProps) => {
  return (
    <div className='flex flex-col w-full text-center items-center gap-[18px]'>
      <span className='text-black text-2xl font-semibold max-w-[200px]  break-words'>
        {title}
      </span>
      {subTitle && (
        <span className='text-darkGray text-[15px] font-semibold max-w-[320px]  break-words'>
          {subTitle}
        </span>
      )}
    </div>
  );
};

export default CenterTitle;
