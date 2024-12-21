"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {DataTableColumnHeader} from"./column-header"
import { Hotel } from "@prisma/client";

export const columns: ColumnDef<Hotel>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },{
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="title"/>
    )
  },{
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="description"/>
    )
  },{
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="type"/>
    )
  },{
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="city"/>
    )
  },{
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="state"/>
    )
  },{
    accessorKey: "country",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="country"/>
    )
  },{
    id: "actions",
    cell: ({ row }) => {
      const hotel = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(hotel.id)}
            >
              Copy Hotel ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View hotel</DropdownMenuItem>
            <DropdownMenuItem>View hotel details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
