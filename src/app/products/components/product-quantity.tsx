'use client'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { clamp } from "@/utils/number-formater"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { useState } from "react"
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  quantity?: number
  inStock?: number
  onPlus?: (val: number) => void
  onMinus?: (val: number) => void
  onDel?: () => void
  buttonClassName?: string
  quantityClassName?: string
}
const ProductQuantity = (props: Props) => {
  const { quantity = 0, inStock = 100, onPlus, onMinus, onDel } = props
  const [num, setNum] = useState((quantity))
  const handleNumChange = (val: number) => {
    if (val < 0) {
      console.log('on delete')
      onDel && onDel()
    }
    if (val > num) {
      console.log('inc')
      onPlus && onPlus(val)
    }
    if (val < num) {
      console.log('desc')
      onMinus && onMinus(val)
    }
    setNum(clamp(val, 0, inStock))
  }
  return (
    <div className={cn("flex flex-row gap-2 items-center", props.className)}>
      <Button variant="outline" size="icon" className={cn("p-1 h-5 w-5", props.buttonClassName)} onClick={() => handleNumChange(num - 1)}  >
        <MinusIcon className="h-4 w-4" />
      </Button>
      <span className={cn(props.quantityClassName)}>{num}</span>
      <Button disabled={num + 1 > inStock} variant="outline" size="icon" className={cn("p-1 h-5 w-5", props.buttonClassName)} onClick={() => handleNumChange(num + 1)}>
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default ProductQuantity