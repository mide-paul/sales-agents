'use client';
import React, { useState } from 'react'
import Image from "next/image";
import { useAuthStore } from '@/app/store/authStore';
import edit_pen from './../public/icons/edit_pen.png';

const Profile = () => {
    const user = useAuthStore(state => state.user);

    // State to store form values
    const [profile, setProfile] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        profilePicture: user?.profilePicture || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type and size
            if (file.size < 5 * 1024 * 1024 && file.type.startsWith('image/')) {
                // Proceed with reading the file
                const reader = new FileReader();
                reader.onloadend = () => {
                    setProfile((prevProfile) => ({
                        ...prevProfile,
                        profilePicture: reader.result as string, // Base64 encoded image
                    }));
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select a valid image file under 5MB.');
            }
        }
    };

    // Handle form submission (Save Changes)
    // const handleSaveChanges = () => {
    //     alert('Profile saved successfully!');
    // };

    // Handle saved changes on the backend
    const handleSaveChanges = async () => {
        const formData = new FormData();
        formData.append('firstName', profile.firstName);
        formData.append('lastName', profile.lastName);
        formData.append('email', profile.email);
        formData.append('phone', profile.phone);
        formData.append('profilePicture', profile.profilePicture); // Base64 string or file object

        try {
            const response = await fetch('https://api.hosoptima.com/api/v1/crm/profile', {
                method: 'PATCH',
                body: formData,
            });
            if (!response.ok) throw new Error('Profile update failed!');
            alert('Profile updated successfully!');
        } catch (error) {
            console.error(error);
            alert('Error updating profile.');
        }
    };

    return (
        <div>
            <div>
                <div>
                    <Image
                        src={profile.profilePicture || '/settings_profile_image.png'}
                        alt="Profile Picture"
                        className="relative mt-8 ml-7 size-11 lg:mt-8 lg:ml-7"
                        width={20}
                        height={20}
                    />
                    {user && (
                        <h3 className="relative -mt-10 ml-24 text-dark text-sm font-semibold text-left lg:-mt-10 lg:ml-24">
                            {profile.firstName} {profile.lastName}
                        </h3>
                    )}
                    <h3 className="relative mt-1 ml-24 text-dark text-sm font-normal text-left lg:mt-1 lg:ml-24">
                        {profile.email}
                    </h3>
                    <h3
                        className="relative mt-6 ml-16 text-light-blue text-sm font-normal text-left lg:mt-6 lg:ml-16 cursor-pointer"
                        onClick={() => document.getElementById('fileInput')?.click()}
                    >
                        Edit Picture
                    </h3>
                    <Image src={edit_pen} alt="" className="absolute -mt-5 ml-7 lg:-mt-5 lg:ml-7" />
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                </div>
            </div>

            <div>
                <div className="flex flex-col lg:flex-row gap-7 ml-7 mt-12 lg:ml-7 lg:mt-12">
                    <div className="flex flex-col gap-2 z-30">
                        <label className="text-sm font-bold text-left text-black">First Name</label>
                        <input
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleChange}
                            className="bg-gray-200 w-72 lg:h-8 text-sm p-2.5 rounded"
                            placeholder="John"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="relative text-sm font-bold text-left text-black">Last Name</label>
                        <input
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleChange}
                            className="relative bg-gray-200 lg:h-8 w-72 text-sm p-2.5 rounded"
                            placeholder="Doe"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 ml-7 mt-8 lg:ml-7 lg:mt-8">
                    <label className="relative text-sm font-bold text-left text-black">Email Address</label>
                    <input
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="relative bg-gray-200 lg:h-8 w-72 text-sm p-2.5 rounded"
                        placeholder="john@example.com"
                    />
                </div>
                <button
                    onClick={handleSaveChanges}
                    className="relative bg-blue-950 text-white text-sm h-8 w-52 mt-10 ml-7 lg:w-52 lg:h-8 lg:mt-10 lg:ml-7 rounded hover:bg-blue-950"
                >
                    Save Changes
                </button>
            </div>
        </div>
    )
}

export default Profile