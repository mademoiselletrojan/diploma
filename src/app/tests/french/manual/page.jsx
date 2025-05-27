'use client';
import dynamic from 'next/dynamic';

// Отключаем SSR, так как используются хуки состояния
const ManualTestPage = dynamic(() => import('@/tests/french/manual/TestPage'), { ssr: false });

export default function ManualTest() {
  return <ManualTestPage />;
}
