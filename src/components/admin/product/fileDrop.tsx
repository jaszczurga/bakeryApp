import React from 'react';
import { Controller} from 'react-hook-form';
import Dropzone from 'react-dropzone';


export const FileInput = ({ control, name }: {control: any, name: string}) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => (
                <Dropzone
                    onDrop={(acceptedFiles) => {
                        if (acceptedFiles.length > 0) {
                            onChange(acceptedFiles[0]);
                        }
                    }}
                    accept={{ 'image/*': [] }}
                    multiple={false}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} style={{ border: '1px solid black', padding: '20px' }}>
                            <input {...getInputProps()} onBlur={onBlur} />
                            <p>Drag and drop an image here, or click to select one</p>
                            {value && (
                                <div style={{ marginTop: '10px' }}>
                                    <img
                                        src={URL.createObjectURL(value)}
                                        alt="Selected file"
                                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                                    />
                                    <p>{value.name}</p>
                                </div>
                            )}
                        </div>
                    )}
                </Dropzone>
            )}
        />
    );
};
