import Image from "next/image";
import Container from "./Container";
import heroImg from "../../public/svg/logo-black.svg";
import Link from "next/link";

const Hero = () => {
    return (
        <>
        <Container className="flex flex-wrap ">
            <div className="flex items-center w-full lg:w-1/2">
            <div className="max-w-2xl mb-8">
                <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
                Project and Task Management!
                </h1>
                <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
                Manage Now is a free website for manage project and task. With many great features for students,
                Manage Now will make your project no longer a nightmare!
                </p>

                <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                <Link href="/auth/login">
                    <button
                        className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                        Login now!
                    </button>
                </Link>
                <p>OR</p>
                <Link href="/auth/register">
                    <button
                        className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700 ">
                        Register
                    </button>
                </Link>
                
                </div>
            </div>
            </div>
            <div className="flex items-center justify-center w-full lg:w-1/2">
            <div className="">
                <Image
                src={heroImg}
                width="616"
                height="617"
                className={"object-cover"}
                alt="Hero Illustration"
                loading="eager"
                placeholder="blur"
                blurDataURL="/blur"
                />
            </div>
            </div>
        </Container>
        </>
    );
}

export default Hero;