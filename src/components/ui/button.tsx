import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:scale-105 transform transition-all duration-300 border border-primary/20",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive/80 text-white shadow-lg hover:shadow-xl hover:shadow-destructive/25 hover:scale-105 transform transition-all duration-300 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 border border-destructive/20",
        outline:
          "border-2 border-primary/30 bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm shadow-lg hover:bg-accent hover:text-accent-foreground hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 hover:scale-105 transform transition-all duration-300 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground shadow-lg hover:shadow-xl hover:shadow-secondary/25 hover:scale-105 transform transition-all duration-300 border border-secondary/20",
        ghost:
          "hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:text-accent-foreground hover:scale-105 transform transition-all duration-300 dark:hover:bg-accent/50 backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-colors duration-300",
        cyber: "bg-gradient-to-r from-primary via-primary/80 to-primary text-primary-foreground shadow-lg hover:shadow-2xl hover:shadow-primary/40 border border-primary/30 relative overflow-hidden group hover:scale-105 transform transition-all duration-300",
        neon: "bg-transparent border-2 border-primary text-primary shadow-lg shadow-primary/25 hover:bg-primary hover:text-primary-foreground hover:shadow-xl hover:shadow-primary/50 hover:scale-105 transform transition-all duration-300",
        quantum: "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 border border-purple-400/30 hover:scale-105 transform transition-all duration-300 animate-pulse",
        hologram: "bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-md border border-cyan-400/30 text-cyan-100 shadow-lg hover:shadow-xl hover:shadow-cyan-400/25 hover:scale-105 transform transition-all duration-300",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-4",
        sm: "h-9 rounded-md gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-md px-8 has-[>svg]:px-6 text-base",
        icon: "size-10",
        xl: "h-14 rounded-lg px-10 has-[>svg]:px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  // Add special effects for certain variants
  const isSpecialVariant = variant === "cyber" || variant === "quantum" || variant === "hologram"

  const buttonContent = (
    <>
      {/* Shimmer effect for cyber variant */}
      {variant === "cyber" && (
        <div className="absolute inset-0 -top-px -left-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-shimmer" />
      )}
      
      {/* Quantum particles for quantum variant */}
      {variant === "quantum" && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-1 h-1 bg-white rounded-full animate-ping" style={{ top: '20%', left: '20%', animationDelay: '0s' }} />
          <div className="absolute w-1 h-1 bg-white rounded-full animate-ping" style={{ top: '60%', left: '70%', animationDelay: '0.5s' }} />
          <div className="absolute w-1 h-1 bg-white rounded-full animate-ping" style={{ top: '80%', left: '30%', animationDelay: '1s' }} />
        </div>
      )}
      
      {/* Hologram scan lines */}
      {variant === "hologram" && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent opacity-50 animate-pulse" />
      )}
      
      {children}
    </>
  )

  if (isSpecialVariant) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Comp
          data-slot="button"
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        >
          {buttonContent}
        </Comp>
      </motion.div>
    )
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {buttonContent}
    </Comp>
  )
}

export { Button, buttonVariants }
