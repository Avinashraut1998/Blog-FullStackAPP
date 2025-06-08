import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const UserTable = () => {
  return (
      <>
          <div className="flex justify-between items-center text-title-sm md:text-title-md mb-3   ">
            <h1 className="text-black dark:text-white">Users</h1>
            {/* <div className="max-h-132.5">
              <CreateUser />
            </div> */}
          </div>
          <div className="">
            <div className="max-w-full overflow-x-auto">
              <table className=" bg-white text-sm md:text-base w-full table-auto">
                <thead>
                  <tr className="bg-bodydark text-center dark:bg-black">
                    <th className="min-w-[100px]  py-2 px-2 font-bold text-black dark:text-white xl:pl-11">
                      User Name
                    </th>

                    <th className="min-w-[100px] py-2 px-2 font-bold text-black dark:text-white">
                      Number
                    </th>
                    <th className="min-w-[100px] py-2 px-2 font-bold text-black dark:text-white">
                      Email
                    </th>
                    <th className=" min-w-[100px] py-2 px-2 font-bold text-center text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {users.length !== 0 ? (
                    users?.map((user) => ( */}
                      <tr
                        className="dark:bg-graydark text-center"
                        // key={user?._id}
                      >
                        <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                          {/* {user?.firstName} {user?.lastName} */}
                        </td>

                        <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                          {/* {user?.number} */}
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                          {/* {user?.email} */}
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2   dark:border-strokedark xl:pl41">
                          <div className="flex gap-2 justify-center  ">
                            <button
                              // onClick={() =>
                              //   navigate(`/admin/user/${user?._id}`)
                              // }
                            >
                              {<FaEye />}
                            </button>
                            <button
                              // onClick={() =>
                              //   navigate(`/admin/user/edit/${user?._id}`)
                              // }
                            >
                              {<FaEdit />}
                            </button>
                            <button
                              // onClick={() =>
                              //   navigate(`/admin/user/edit/${user?._id}`)
                              // }
                            >
                              {<FaTrash />}
                            </button>
                            {/* <DeleteButton
                              onDelete={() => handleDelete(user?._id)}
                            /> */}
                          </div>
                        </td>
                      </tr>
                    {/* )) */}
                  {/* ) : ( */}
                    {/* <tr className="  dark:bg-meta-4">
                      <td className="border-b border-[#eee] py-3 px-2 pl-9 dark:border-strokedark xl:pl-11">
                        empty
                      </td>

                      <td className="border-b border-[#eee] py-3 px-2 pl-9 dark:border-strokedark xl:pl-11">
                        empty
                      </td>
                      <td className="border-b border-[#eee] py-3 px-2 pl-9 dark:border-strokedark xl:pl-11">
                        empty
                      </td>
                      <td className="border-b border-[#eee] py-3 px-2 pl-9  dark:border-strokedark xl:pl-11">
                        empty
                      </td>
                    </tr> */}
                  
                </tbody>
              </table>
            </div>
          </div>
        </>
  )
}
export default UserTable