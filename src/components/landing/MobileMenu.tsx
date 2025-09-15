import * as React from "react";
import {MenuItem} from "@/types";
import {Button} from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {ChevronsUpDown} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";


type MobileMenuTypes = {
    navMenu: MenuItem[]
}

const MobileMenu: React.FC<MobileMenuTypes> = ({navMenu}) => {
    return (
        <div>
            <ul className={"mb-3"}>
                {navMenu.map(({href, label, submenu}, index) => (
                    <li key={index}>
                        {submenu ? (
                            <Collapsible>
                                <CollapsibleTrigger asChild={true}>
                                    <Button variant={"ghost"} className={"w-full justify-between"}>
                                        {label}

                                        <ChevronsUpDown />
                                    </Button>
                                </CollapsibleTrigger>

                                <CollapsibleContent className={"ps-2"}>
                                    <ul className={"border-l border-l-muted-foreground/20"}>
                                        {submenu.map(({href, label}, index) => (
                                            <li key={index}>
                                                <Button asChild={true} variant={"ghost"} className={"w-full justify-start text-muted-foreground hover:bg-transparent"}>
                                                    <a href={href}>{label}</a>
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </CollapsibleContent>
                            </Collapsible>
                        ) : (
                            <Button asChild={true}
                                    variant={"ghost"}
                                    className={"w-full justify-start"}
                            >
                                <a href={href}>{label}</a>
                            </Button>
                        )}
                    </li>
                ))}

            </ul>

            <Separator className={"bg-muted-foreground/20"}/>

            <div className={"grid grid-cols-[1fr,1fr] items-center gap-2 mt-4"}>
                <Link href={"/login"}>
                    <Button
                        variant={"ghost"}
                        className={"w-full"}
                    >
                        Login
                    </Button>
                </Link>

                <Link href={"/register"}>
                    <Button
                        className={"w-full"}
                    >
                        Register
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default MobileMenu