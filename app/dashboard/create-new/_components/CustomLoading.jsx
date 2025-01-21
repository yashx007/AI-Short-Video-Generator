import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Image from 'next/image';

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className='bg-white'>
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only">Loading...</AlertDialogTitle> {/* Accessible title */}
        </AlertDialogHeader>
        <AlertDialogDescription className="sr-only">
          Generating your video... Please do not refresh the page while the process is ongoing.
        </AlertDialogDescription>
        <div className='bg-white flex flex-col items-center my-10 justify-center'>
          <Image src={'/progress.gif'} width={100} height={100} alt='loading'/>
          <h2>Generating your video... Do not Refresh</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
