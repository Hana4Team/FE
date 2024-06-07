import { useEffect, useRef, useState } from 'react';
import Topbar from '../../components/Topbar';
import { MissionStartHeader } from '../../components/molecules/MissionStartHeader';
import { NewsCategory } from '../../components/molecules/NewsCategory';
import { NewsItem } from '../../components/molecules/NewsItem';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { Alarm } from '../../components/molecules/Alarm';

const categories = [
  '금융',
  '경제',
  '경영',
  '재테크',
  '글로벌',
  '금융시장',
  '금융산업',
  '금융디지털',
  '부동산',
  '은행',
];

export const NewsList = () => {
  const [choiceCategory, setChoiceCategory] = useState<string>(categories[0]);
  const [showAlarm, setShowAlarm] = useState<boolean>(false);
  const [activeAnimation, setActiveAnimation] = useState<boolean>(false);
  const alarmMsgRef = useRef<string>('');

  const { data: newsList } = useQuery({
    queryKey: ['news', choiceCategory],
    queryFn: () => {
      const res = ApiClient.getInstance().getNews(choiceCategory);
      return res;
    },
  });

  const postAlarm = useMutation({
    mutationFn: (message: number) =>
      ApiClient.getInstance().postAlarm(`${message}하나머니가 적립되었어요!`),
    onSuccess: (_, variables) => {
      setShowAlarm(true);
      alarmMsgRef.current = `${variables}하나머니가 적립되었어요!`;
    },
  });

  const putPoint = useMutation({
    mutationFn: () => ApiClient.getInstance().updatePoint(false),
    onSuccess: (data) => {
      postAlarm.mutate(data.points);
    },
  });

  const putCheckNews = useMutation({
    mutationFn: () => ApiClient.getInstance().putCheckNews(),
    onSuccess: (data) => {
      if (data.success) {
        putPoint.mutate();
      }
    },
  });

  const putCheckNewsHandler = () => {
    putCheckNews.mutate();
  };

  const changeCategory = (keyword: string) => {
    setChoiceCategory(keyword);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showAlarm) {
      setActiveAnimation(true);
      timer = setTimeout(() => {
        setShowAlarm(false);
      }, 5000);
    } else if (!showAlarm && activeAnimation) {
      setActiveAnimation(true);
      timer = setTimeout(() => {
        setActiveAnimation(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showAlarm]);

  return (
    <div className='relative w-full'>
      {(showAlarm || activeAnimation) && (
        <div
          className={`fixed max-w-[500px] w-full z-[60] ${showAlarm ? 'animate-slidedown' : 'animate-slideup'}`}
        >
          <Alarm message={alarmMsgRef.current} />
        </div>
      )}
      <Topbar title='오늘의 금융' />
      <MissionStartHeader
        icon='icons/news.svg'
        title={`금융 컨텐츠를 읽고\n하나머니를 받아요`}
      />
      <div className='flex flex-col justify-center items-center bg-white w-11/12 m-auto rounded-lg gap-5 py-5'>
        <h2 className='w-11/12 text-3xl font-hanaCM pt-2'>주제별 콘텐츠</h2>
        <div
          id='news-list'
          className='w-11/12 flex gap-3 overflow-x-scroll whitespace-nowrap'
        >
          {categories.map((category, index) => (
            <NewsCategory
              key={index}
              categoryName={category}
              isClicked={choiceCategory === category}
              onClick={changeCategory}
            />
          ))}
        </div>
        {newsList &&
          newsList.items.map((item, index) => (
            <NewsItem
              key={index}
              title={item.title}
              desc={item.description}
              pubDate={`${new Date(item.pubDate).getFullYear()}-${(new Date(item.pubDate).getMonth() + 1).toString().padStart(2, '0')}-
              ${new Date(item.pubDate).getDate().toString().padStart(2, '0')}`}
              keyword={choiceCategory}
              link={item.originallink}
              onClickedNews={putCheckNewsHandler}
            />
          ))}
      </div>
    </div>
  );
};
