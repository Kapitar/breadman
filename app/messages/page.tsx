import { messages } from "./messages";
import Image from "next/image";

export default function Messages() {
    return (
    <div className="grid place-items-center grid-cols-2 gap-4 md:gap-8 lg:gap-12 p-4 md:p-8 lg:p-12">
        {messages.map((message) => (
            <div key={message.author} className="bg-white mx-auto w-full p-4 rounded-xl ">
                <h1 className="text-2xl font-bold">{message.author}</h1>
                <p className="text-xl font-semibold">{message.text}</p>
                {message.image && <Image src={`/photos/${message.image}`} alt={message.author} width={400} height={200} />}
            </div>
        ))}
    </div>)
}   