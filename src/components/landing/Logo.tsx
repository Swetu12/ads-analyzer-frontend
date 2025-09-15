import * as React from "react";
import Link from "next/link";

type LogoProps = {
    logoType?: "default" | "icon"
}

const Logo: React.FC<LogoProps> = ({ logoType = "default" }) => {
    return (
        <Link
            href={""}
            className={""}
        >
            {logoType === "default" ? (
                <img
                    src={`/logo.svg`}
                    alt={"Logo"}
                    width={150}
                    height={31}
                />
            ) : (
                <img
                    src={`/favicon.svg`}
                    alt={"Logo"}
                    width={32}
                    height={32}
                />
            )}
        </Link>
    )
}

export default Logo