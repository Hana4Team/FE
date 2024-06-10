import { FC } from 'react';

interface IProps {
  title: string;
  desc: string;
  pubDate: string;
  keyword: string;
  link: string;
  onClickedNews: () => void;
}

export const NewsItem: FC<IProps> = ({
  title,
  desc,
  pubDate,
  keyword,
  link,
  onClickedNews,
}) => {
  return (
    <div
      className='w-11/12 bg-[#F9FAFB] flex flex-col justify-between p-7 gap-5 rounded-3xl'
      onClick={() => {
        window.open(link);
        onClickedNews();
      }}
    >
      <h1
        className='font-hanaBold text-[1.7rem] text-ellipsis line-clamp-2'
        dangerouslySetInnerHTML={{ __html: title }}
      ></h1>
      <p
        className='font-hanaRegular text-xl text-ellipsis line-clamp-3'
        dangerouslySetInnerHTML={{ __html: desc }}
      ></p>
      <div className='flex justify-between text-lg text-[#606A78]'>
        <span className='bg-[#E0E3E7] font-hanaMedium py-1 px-2 rounded-lg'>
          {keyword}
        </span>
        <span className='mr-3 font-hanaCM'>{pubDate}</span>
      </div>
    </div>
  );
};
