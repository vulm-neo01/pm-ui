import {
    FaceSmileIcon,
    ChartBarSquareIcon,
    CursorArrowRaysIcon,
    DevicePhoneMobileIcon,
    AdjustmentsHorizontalIcon,
    SunIcon,
    } from "@heroicons/react/24/solid";
    
    import benefitOneImg from "../../public/img/benefit-one.png";
    import benefitTwoImg from "../../public/img/benefit-two.png";
    
    const benefitOne = {
    title: "Manage your project easily",
    desc: "You can create project, task and add other people to your project. With many features inside helps you and friends do it together!",
    image: benefitOneImg,
    bullets: [
        {
        title: "Create and monitor easily",
        desc: "You can settings deadline, project status and it's documentation",
        icon: <FaceSmileIcon />,
        },
        {
        title: "Fast track progress",
        desc: "With deadline, monitor can see another progress.",
        icon: <ChartBarSquareIcon />,
        },
        {
        title: "Convenient authorization for members",
        desc: "You can grant permission to members to manage your project.",
        icon: <CursorArrowRaysIcon />,
        },
    ],
};

const benefitTwo = {
    title: "Note everythings and memorize",
    desc: "With note feature, you can easily write down everything you want to do. Besides, your project and task can be alert in notes",
    image: benefitTwoImg,
    bullets: [
    {
        title: "Take note with one click",
        desc: "Use feature now when access your account",
        icon: <DevicePhoneMobileIcon />,
    },
    {
        title: "Project and task Pins",
        desc: "Pin your project and task to remind yourself",
        icon: <AdjustmentsHorizontalIcon />,
    },
    {
        title: "Alerts",
        desc: "Note Alert make you never forget to do its",
        icon: <SunIcon />,
    },
    ],
};


export {benefitOne, benefitTwo};