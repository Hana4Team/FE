import { useState } from 'react';
import Topbar from '../../components/Topbar';
import { MissionStartHeader } from '../../components/molecules/MissionStartHeader';
import { NewsCategory } from '../../components/molecules/NewsCategory';
import { NewsItem } from '../../components/molecules/NewsItem';

const items = [
  {
    title: "KB국민은행 리브 Next, '한국사 매일 퀴즈' 서비스 오픈 外",
    originallink: 'https://www.rcast.co.kr/news/articleView.html?idxno=24922',
    link: 'https://www.rcast.co.kr/news/articleView.html?idxno=24922',
    description:
      '이날 행사에는 100명의 신규 장학생과 함께 협력기관 담당자들이 참석해 장학증서 수여식, <b>금융경제</b>교육 및 선배 자립준비청년과의 토크콘서트 등의 시간을 가졌으며 스포츠 경기 및 뮤지컬 관람 등 문화예술 활동도... ',
    pubDate: 'Fri, 31 May 2024 17:00:00 +0900',
  },
  {
    title: "신한장학재단, '2024년 자립준비청년 장학지원사업 힐링데이' 개최",
    originallink:
      'https://www.dailysmart.co.kr/news/articleView.html?idxno=88119',
    link: 'https://www.dailysmart.co.kr/news/articleView.html?idxno=88119',
    description:
      '이날 행사에는 100명의 신규 장학생과 함께 협력기관 담당자들이 참석해 장학증서 수여식, <b>금융경제</b>교육, 선배 자립준비청년과의 토크콘서트 등의 시간을 가졌으며 스포츠 경기, 뮤지컬 관람 등 문화예술 활동도 함께... ',
    pubDate: 'Fri, 31 May 2024 17:00:00 +0900',
  },
  {
    title: '신한장학재단, ‘자립준비청년 장학지원사업 힐링데이’ 개최',
    originallink: 'https://www.bigtanews.co.kr/article/view/big202405310018',
    link: 'https://www.bigtanews.co.kr/article/view/big202405310018',
    description:
      '이날 행사에는 100명의 신규 장학생과 함께 협력기관 담당자들이 참석해 장학증서 수여식, <b>금융경제</b>교육 및 선배 자립준비청년과의 토크콘서트 등의 시간을 가졌으며 스포츠 경기 및 뮤지컬 관람 등 문화예술 활동도... ',
    pubDate: 'Fri, 31 May 2024 16:56:00 +0900',
  },
  {
    title: '연세대, 아프리카 정상 특별강연 및 명예박사 수여',
    originallink:
      'https://www.kfenews.co.kr/news/articleView.html?idxno=623317',
    link: 'https://www.kfenews.co.kr/news/articleView.html?idxno=623317',
    description:
      '사진=연세대학교 한국<b>금융경제</b>신문=심영범 기자 | 연세대학교가 2024 한-아프리카 정상회의 차 방한 중인 아프리카 정상들을 초청해 특별 강연과 명예박사 학위수여식을 진행한다고 31일 밝혔다. 특별 강연은 다음달 3일... ',
    pubDate: 'Fri, 31 May 2024 16:54:00 +0900',
  },
  {
    title: "신한장학재단, 자립준비청년 위해 '힐링데이' 개최",
    originallink:
      'https://www.pinpointnews.co.kr/news/articleView.html?idxno=269147',
    link: 'https://www.pinpointnews.co.kr/news/articleView.html?idxno=269147',
    description:
      '이날 행사에는 100명의 신규 장학생과 함께 협력기관 담당자들이 참석해 장학증서 수여식, <b>금융경제</b>교육 및 선배 자립준비청년과의 토크콘서트 등의 시간을 가졌으며 스포츠 경기 및 뮤지컬 관람 등 문화예술 활동도... ',
    pubDate: 'Fri, 31 May 2024 16:42:00 +0900',
  },
];

const categories = [
  '금융',
  '경제',
  '경영',
  '재테크',
  '글로벌',
  '금융디지털',
  '부동산',
  '은행',
];

export const NewsList = () => {
  const [choiceCategory, setChoiceCategory] = useState<string>('금융');

  const changeCategory = (keyword: string) => {
    setChoiceCategory(keyword);
  };

  return (
    <>
      <Topbar title='일일미션' />
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
        {items.map((item, index) => (
          <NewsItem
            key={index}
            title={item.title}
            desc={item.description}
            pubDate={`${new Date(item.pubDate).getFullYear()}-${(new Date(item.pubDate).getMonth() + 1).toString().padStart(2, '0')}-
              ${new Date(item.pubDate).getDate().toString().padStart(2, '0')}`}
            keyword={choiceCategory}
            link={item.originallink}
          />
        ))}
      </div>
    </>
  );
};
