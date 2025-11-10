import { Clock3, NotebookText } from "lucide-react";
import { useRouter } from "next/navigation";

const Kelas = ({product}) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`kelas/${product.id}`)
  }

  return (
    <div onClick={handleClick} className="p-5 flex gap-9 border rounded-xl group cursor-pointer">
      <img className="w-70 h-50 rounded-xl" src={product.image} alt="" />
      <div>
        <h1 className="text-lg font-bold duration-200 transition-all ease-in-out group-hover:text-green-400">
          {product.title}
        </h1>
        <p className="text-sm  text-[#333333AD]">
          Mulai transformasi dengan instruktur profesional, harga yang
          terjangkau, dan kurikulum terbaik
        </p>
        <div className="flex gap-2 mt-2">
          <img
            src="/assets/classOwner.png"
            className="w-12 h-12 rounded-lg"
            alt=""
          />
          <div className="leading-none">
            <h2 className="text-base font-semibold">{product.owner}</h2>
            <p className="text-sm text-[#333333AD]">
              {product.owner_position}
            </p>
          </div>
        </div>
        <div className="flex text-[#333333AD] mt-3 gap-4">
          <div className="flex gap-1">
            <NotebookText /> 3 Modul
          </div>
          <div className="flex gap-1">
            <Clock3 /> 30-40 Menit
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kelas;
