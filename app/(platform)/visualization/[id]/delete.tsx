"use client";
import { IoMdSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TVisualization } from "@/app/lib/definitions";
import { DeleteVisualization } from "@/app/lib/controller";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function Delete({ visId }: { visId: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const handleDelete = async () => {
    const { data, message, success }: { data: TVisualization; message: string; success: boolean } =
      await DeleteVisualization(getSession, visId);
    router.refresh();
  };

  return (
    <>
      <div
        className="hidden md:flex gap-1 justify-center items-center mt-2 flex-row hover:bg-neutral-100 rounded-md p-2 duration-200 cursor-pointer"
        onClick={onOpen}
      >
        <MdDelete className="text-2xl text-red-600" /> <div className="text-red-600">Delete</div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Are you sure to delete?</ModalHeader>
              <ModalBody>This action is irreversible.</ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Back</Button>
                <Button color="danger" onPress={() => handleDelete()}>
                  Confirm Delete Visualization
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
