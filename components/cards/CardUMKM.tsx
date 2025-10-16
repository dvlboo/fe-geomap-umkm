import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function FoodCardUMKM({ props }: { 
  props: { 
    image: any; 
    name: any; 
    slug: any } 
  }) {
  return (
    <div
      className="bg-white p-5 rounded-2xl flex flex-col"
      style={{ boxShadow: '-5px 5px 15px rgba(0,0,0,0.12)' }}
    >
      <p className="mb-3 font-semibold text-xl max-w-[200px]">{props.name}</p>

      <Image
        src={props.image}
        alt={props.name}
        width={500}
        height={500}
        className="w-50 h-full rounded-2xl"
      />

      <Link
        href={`/umkm/${props.slug}`}
        className="group flex items-center justify-between bg-black text-white px-6 py-2 rounded-full hover:bg-[var(--yellow-umkm)] transition-colors mt-5"
      >
        <p className="group-hover:text-black font-medium transition-colors">Jelajahi MAP</p>
        <div className="bg-transparent p-1 rounded-full outline-1 outline-white group-hover:bg-black group-hover:outline-none transition-colors">
          <div className="bg-white p-1 rounded-full group-hover:bg-black transition-colors">
            <FaArrowRight className="w-2 h-auto text-black group-hover:text-[var(--yellow-umkm)] transition-colors" />
          </div>
        </div>
      </Link>
    </div>
  );
}
