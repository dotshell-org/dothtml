import {SoftwareCardType} from "@/types/home/SoftwareCardType";
import SoftwareCard from "@/components/home/software-cards/SoftwareCard";

const SoftwareCardsGroup = () => {
    const cards: SoftwareCardType[] = [
        {imageSrc: "cafeteria-manager.svg", title: "Cafeteria Manager", description: "Your companion to manage your cafeteria business"},
        {imageSrc: "ico.svg", title: "Ico", description: "Your powerful space to manage accounting, stocks and sales"},
    ]

    return (
        <div className="mt-10 sm:mt-20 flex flex-wrap justify-center gap-y-8">
            {
                cards.map(({imageSrc, title, description}) => (
                    <SoftwareCard imageSrc={imageSrc} title={title} description={description} key={title} />
                ))
            }
        </div>
    )
}

export default SoftwareCardsGroup;