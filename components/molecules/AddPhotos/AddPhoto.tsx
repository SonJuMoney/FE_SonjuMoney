import PhotoInput from '@/components/atoms/Inputs/PhotoInput';
import AddPhotoButton from '@/components/atoms/Photos/AddPhotoButton';
import Photo from '@/components/atoms/Photos/Photo';
import { useRef } from 'react';

type AddPhotoProps = {
  maxLength: number;
  files: File[];
  onAddPhotos: (newFiles: File[]) => void;
  onDelete: (image: File) => void;
};

const AddPhoto = ({
  maxLength,
  files,
  onAddPhotos,
  onDelete,
}: AddPhotoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const changeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const imgFileList = target.files;

    if (imgFileList) {
      const newFiles = Array.from(imgFileList);
      onAddPhotos(newFiles);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const onClick = () => {
    if (fileInputRef?.current) fileInputRef.current.click();
  };

  return (
    <div className='flex w-full overflow-x-scroll'>
      {!files.length ? (
        <div className='flex w-full p-[20px]'>
          <PhotoInput maxLength={maxLength} onClick={onClick}>
            <input
              id='inputFile'
              type='file'
              accept='image/*'
              onChange={(e) => changeImg(e)}
              style={{ display: 'none' }}
              multiple
              max={maxLength}
              ref={fileInputRef}
            ></input>
          </PhotoInput>
        </div>
      ) : (
        <div className='flex gap-3 py-[20px] pr-[20px]'>
          <AddPhotoButton
            itemCnt={files.length}
            maxCnt={maxLength}
            onClick={onClick}
            className='ml-[20px]'
          >
            <input
              id='inputFile'
              type='file'
              accept='image/*'
              onChange={(e) => changeImg(e)}
              style={{ display: 'none' }}
              multiple
              max={5}
              ref={fileInputRef}
            ></input>
          </AddPhotoButton>
          {files.map((each) => {
            return (
              <Photo
                key={each.name}
                imgUrl={URL.createObjectURL(each)}
                onDelete={() => onDelete(each)}
              ></Photo>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AddPhoto;

// 부모 컴포넌트 사용 예시

//  const [files, setFiles] = useState<File[]>([]);
//   const MAX_FILES = 5;

//   const handleAddPhotos = (newFiles: File[]) => {
//     const updatedFiles = addPhotos(files, newFiles, MAX_FILES);
//     setFiles(updatedFiles);
//   };

//   const handleDeletePhoto = (fileToDelete: File) => {
//     const updatedFiles = deletePhoto(files, fileToDelete);
//     setFiles(updatedFiles);
//   };

// return (
//   <div>
//     <AddPhoto
//       maxLength={5}
//       files={files}
//       onAddPhotos={handleAddPhotos}
//       onDelete={handleDeletePhoto}
//     />
//   </div>
// );
