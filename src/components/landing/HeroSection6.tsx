import Spline from '@splinetool/react-spline/next';

export default function Home() {
  return (
    <main className="bg-[url('/Assets/Images/Philharmonie.jpg')] bg-contain bg-no-repeat bg-center w-full h-screen">
        <Spline
        scene="https://prod.spline.design/GMNpltbWp9KItCUl/scene.splinecode" 
        className="w-full h-full bg-linear-to-b from-transparent to-teal-900/50"
      />
    </main>
  );
}




    

