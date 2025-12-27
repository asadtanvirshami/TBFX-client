import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { closeForm } from "@/redux/slices/ui/slice";
import { RootState } from "@/redux/store";
import { DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ViewStrategy = () => {
  const isOpen = useSelector(
    (state: RootState) => state.ui.forms["view-strategy"]
  );
  const strategy = useSelector((state: RootState) => state.strategy.values);
  const dispatch = useDispatch();
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[425px] max-h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>{strategy?.title}</DialogTitle>
        </DialogHeader>
        {strategy?.comment}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => dispatch(closeForm("view-strategy"))}
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewStrategy;
