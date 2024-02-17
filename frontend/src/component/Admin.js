
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, CardFooter, Tabs, Avatar, IconButton, Tooltip, } from "@material-tailwind/react";

import { useEffect, useState } from "react";
import AddUser from './AddUser';
import Edit from "./edituser";
const img = require('../images/profile.png')
const TABLE_HEAD = ["Name", "Email", "Username", "Address", "Action"];

export function Admin() {
    const [menuOpen, setMenuOpen] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenedit, setIsModalOpenedit] = useState(false);
    const [userdata, setUserData] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/getUser');
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const datas = await response.json();
                setUserData(datas.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const handleEdit =(email) => {
        setSelectedEmail(email)
        setMenuOpen(prevState => ({
            ...prevState,
            [email]: !prevState[email] // Toggle the menu state for the clicked row
        }));
    };
    const addUser = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const editUser = () => {
        setIsModalOpenedit(true);
    }
    const closeModaluser = () => {
        setIsModalOpenedit(false);
    };
    const handleMenuOption = (option) => {
        if (option === 'edit') {
            console.log('Edit:', selectedEmail);
            editUser()
            
        } else if (option === 'delete') {
            // Handle delete logic here
            console.log('Delete:', selectedEmail);
        }
        setMenuOpen(prevState => ({ ...prevState, [selectedEmail]: false }));
    };
    return (
        <Card className="h-full w-full p-5">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button className="flex items-center gap-3" size="sm" onClick={addUser}>
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add User
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value="all" className="w-full md:w-max">

                    </Tabs>
                    <div className="w-56 md:w-72">
                        <Input placeholder="Search" />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="ml-5 mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                    >
                                        {head}{" "}
                                        {index !== TABLE_HEAD.length - 1 && (
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        )}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>

                        {userdata.map((userData, index) => {
                            const { name, email, username, address } = userData;
                            const isLast = index === userdata.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                            return (
                                <tr key={userData._id}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={img} size="sm" />
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {name}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography variant="small" color="blue-gray" className="font-normal ">
                                                {email}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {username}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {address}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Tooltip content="Edit User">
                                            <Button variant="text" onClick={() => handleEdit(email)}>
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                        </Tooltip>
                                    </td>
                                    {menuOpen[email] && (
                                        <div className="absolute right-0 mt-14 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                            <div className="py-1"
                                                role="menu"
                                                aria-orientation="vertical"
                                                aria-labelledby="options-menu">
                                                <button
                                                    onClick={() => handleMenuOption('edit')}
                                                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                                                    role="menuitem">Edit
                                                </button>
                                                <button
                                                    onClick={() => handleMenuOption('delete')}
                                                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                                                    role="menuitem">Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            </CardFooter>
            {isModalOpen && <AddUser closeModal={closeModal} />}
            
            {isModalOpenedit && <Edit closeModaluser={closeModaluser} selectedEmail={selectedEmail} />}
        </Card>
    );
}
