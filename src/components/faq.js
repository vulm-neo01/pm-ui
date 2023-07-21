"use client"

import React from "react";
import Container from "./Container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const Faq = () => {
    return (
        <Container className="!p-0">
        <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
            {faqdata.map((item, index) => (
            <div key={item.question} className="mb-5">
                <Disclosure>
                {({ open }) => (
                    <>
                    <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-700">
                        <span>{item.question}</span>
                        <ChevronUpIcon
                        className={`${
                            open ? "transform rotate-180" : ""
                        } w-5 h-5 text-indigo-500`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-600 dark:text-gray-200">
                        {item.answer}
                    </Disclosure.Panel>
                    </>
                )}
                </Disclosure>
            </div>
            ))}
        </div>
        </Container>
    );
    }

    const faqdata = [
    {
        question: "Is this web completely free to use?",
        answer: "Yes, this web is completely free to use.",
    },
    {
        question: "How many projects and task i can manage?",
        answer: "With beta versions, you can manage maximum 10 number of projects",
    },
    {
        question: "Can i use the feature when not logged in?",
        answer: "So sorry but you should login to use all the features"
    },
    {
        question: "This platform really for students?",
        answer: "Absolutely, we create it to make students study together easily"
    },
];

export default Faq;