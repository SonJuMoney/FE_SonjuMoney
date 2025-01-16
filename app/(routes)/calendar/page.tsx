import PlanCard from '@/components/molecules/Cards/PlanCard';

const PlanList = () => {
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset).toISOString().split('T')[0];

  console.log(today);

  const events = [
    {
      date: '2025-01-13',
      day: '월요일',
      events: [
        {
          id: 1,
          type: 'MEMORIAL',
          title: '준용이네 부부 결혼 기념일',
          time: '종일',
          members: [{ id: 1, name: 'Member1', imgUrl: '/Role1.png' }],
        },

        {
          id: 2,
          type: 'BIRTHDAY',
          title: '준용이 생일',
          time: '종일',
          members: [{ id: 1, name: 'Member1', imgUrl: '/Role1.png' }],
        },
        {
          id: 1,
          type: 'MEMORIAL',
          title: '준용이네 부부 결혼 기념일',
          time: '종일',
          members: [{ id: 1, name: 'Member1', imgUrl: '/Role1.png' }],
        },

        {
          id: 2,
          type: 'BIRTHDAY',
          title: '준용이 생일',
          time: '종일',
          members: [{ id: 1, name: 'Member1', imgUrl: '/Role1.png' }],
        },
        {
          id: 1,
          type: 'MEMORIAL',
          title: '준용이네 부부 결혼 기념일',
          time: '종일',
          members: [{ id: 1, name: 'Member1', imgUrl: '/Role1.png' }],
        },

        {
          id: 2,
          type: 'BIRTHDAY',
          title: '준용이 생일',
          time: '종일',
          members: [{ id: 1, name: 'Member1', imgUrl: '/Role1.png' }],
        },
      ],
    },
    {
      date: '2025-01-16',
      day: '화요일',
      events: [
        {
          id: 2,
          type: 'DINING',
          title: '건강 검진',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
        {
          id: 2,
          type: 'DINING',
          title: '건강 검진',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
      ],
    },
    {
      date: '2025-01-19 ',
      day: '화요일',
      events: [
        {
          id: 3,
          type: 'DINING',
          title: '건강 검진',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
        {
          id: 3,
          type: 'DINING',
          title: '건강 검진',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
        {
          id: 3,
          type: 'DINING',
          title: '건강 검진',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
        {
          id: 3,
          type: 'DINING',
          title: '건강 검진',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
        {
          id: 3,
          type: 'DINING',
          title: '건강 검진',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
      ],
    },
    {
      date: '2025-01-20',
      day: '화요일',
      events: [
        {
          id: 4,
          type: 'DINING',
          title: '4',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
      ],
    },
    {
      date: '2025-01-23',
      day: '화요일',
      events: [
        {
          id: 5,
          type: 'DINING',
          title: '5',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
      ],
    },

    {
      date: '2025-01-24',
      day: '화요일',
      events: [
        {
          id: 5,
          type: 'DINING',
          title: '5',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
      ],
    },
    {
      date: '2025-01-25',
      day: '화요일',
      events: [
        {
          id: 5,
          type: 'DINING',
          title: '5',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
      ],
    },
  ];

  return (
    <div className='pageLayout'>
      {events.map((day) => (
        <PlanCard
          key={day.date}
          date={day.date}
          day={day.day}
          events={day.events}
          isToday={day.date === today}
        />
      ))}
    </div>
  );
};
export default PlanList;
