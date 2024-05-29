import * as React from "react"
import { cn } from "../../lib/utils"

interface TileProps {

}

const Tile = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & TileProps
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "grid md:grid-cols-3 lg:grid-cols-5 gap-4",
                className
            )}
            {...props}
        />
    )
})
export default Tile