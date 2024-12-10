import dynamic from 'next/dynamic';

const Error = dynamic(() => import("@/components/loading/ErrorPageWhite"), {
  ssr: false,
});

const Custom404 = () => {
  return <Error />;
};

export default Custom404;
