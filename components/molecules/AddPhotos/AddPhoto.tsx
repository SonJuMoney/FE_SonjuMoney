import PhotoInput from '@/components/atoms/Inputs/PhotoInput';
import AddPhotoButton from '@/components/atoms/Photos/AddPhotoButton';
import Photo from '@/components/atoms/Photos/Photo';
import VideoPreview from '@/components/atoms/Photos/VideoPreview';
import { memo, useRef } from 'react';

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
              name='image'
              type='file'
              accept='image/*,video/*'
              onChange={(e) => changeImg(e)}
              style={{ display: 'none' }}
              multiple
              max={maxLength}
              ref={fileInputRef}
            ></input>
          </PhotoInput>
        </div>
      ) : (
        <div className='flex gap-3 p-[20px] '>
          {files.length < maxLength && (
            <AddPhotoButton
              itemCnt={files.length}
              maxCnt={maxLength}
              onClick={onClick}
            >
              <input
                id='inputFile'
                type='file'
                name='image'
                accept='image/*,video/*'
                onChange={(e) => changeImg(e)}
                style={{ display: 'none' }}
                multiple
                max={maxLength}
                ref={fileInputRef}
              ></input>
            </AddPhotoButton>
          )}

          {files.map((file) => {
            if (file.type.startsWith('video/')) {
              return (
                <VideoPreview
                  key={file.name}
                  file={file}
                  onDelete={() => onDelete(file)}
                />
              );
            } else {
              return (
                <Photo
                  key={file.name}
                  imgUrl={URL.createObjectURL(file)}
                  onDelete={() => onDelete(file)}
                ></Photo>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default memo(AddPhoto);

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
