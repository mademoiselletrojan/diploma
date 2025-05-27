'use client';
import dynamic from 'next/dynamic';

const TestPage = dynamic(() => import('@/tests/french/grammar/TestPage'), { ssr: false });

export default function EnglishTest() {
  return <TestPage />;
}
