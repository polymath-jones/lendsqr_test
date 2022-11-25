import router from "next/router";
import { User } from "../../../utils/interfaces";
import Dropdown, { DropdownItem } from "../../common/dropdown";

interface Props {
  users: User[];
  openFilterPane: VoidFunction;
}

const UserTable: React.FC<Props> = ({ users, openFilterPane }) => {
  const tableHeaders = [
    "organization",
    "Username",
    "Email",
    "Phone number",
    "Date joined",
    "Status",
  ];

  const statusColors = {
    active: "text-accent-success bg-accent-success ",
    blacklisted: "text-accent-danger bg-accent-danger",
    pending: "text-accent-yellow bg-accent-yellow",
    inactive: "text-secondary-100 bg-secondary-100",
  };

  const statuses = ["active", "blacklisted", "pending", "inactive"] as const;

  return (
    <table className="w-full">
      <thead>
        <tr className="sticky top-0 bg-white">
          {tableHeaders.map((h, index) => (
            <th key={index} className=" items-center gap-2.5">
              <button className="flex items-center gap-2.5">
                <span className="font-semibold text-xs text-secondary-400 uppercase">
                  {h}
                </span>
                {/* prettier-ignore */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6.22222 13.3333H9.77778V11.5555H6.22222V13.3333ZM0 2.66666V4.44443H16V2.66666H0ZM2.66667 8.88888H13.3333V7.1111H2.66667V8.88888Z" fill="#545F7D"/>
                </svg>
              </button>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {users.map((user) => {
          const randStatus = statuses[Math.floor(Math.random() * 3)];
          const color = statusColors[randStatus];

          return (
            <tr
              className="cursor-pointer"
              onClick={() => router.push(`/dashboard/users/${user.id}`)}
            >
              <td>{user.orgName} </td>
              <td>{user.userName} </td>
              <td>{user.email} </td>
              <td>{user.phoneNumber} </td>
              <td>{new Date(user.createdAt).toDateString()} </td>
              <td onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2.5">
                  <div className="w-25">
                    <span
                      className={`block font-medium capitalize bg-opacity-10 py-1 px-2.5 w-fit text-center rounded-full ${color}`}
                    >
                      {randStatus}
                    </span>
                  </div>
                  <Dropdown
                    items={[
                      {
                        text: "View Details",
                        onClick: () =>
                          router.push(`/dashboard/users/${user.id}`),
                        icon:
                          // prettier-ignore
                          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" >
                              <path d="M15.4533 5.44011L15.452 5.43853C15.0399 4.92195 14.0949 3.82509 12.7977 2.85586C11.4993 1.88564 9.83832 1.03611 7.99968 1.03611C6.16104 1.03611 4.50011 1.88561 3.20166 2.85582C1.9029 3.82627 0.957158 4.92466 0.545819 5.44047C0.274826 5.76662 0.277249 6.2343 0.544833 6.57367L0.544827 6.57368L0.545641 6.57468C0.956296 7.08187 1.90229 8.17692 3.20172 9.14589C4.50012 10.1141 6.16105 10.9636 7.99968 10.9636C9.83832 10.9636 11.4993 10.1141 12.7977 9.1438C14.0967 8.17312 15.0425 7.07437 15.4538 6.55832C15.7074 6.24944 15.7071 5.74922 15.4533 5.44011ZM7.99968 9.75611C6.48691 9.75611 5.06807 9.02252 3.92942 8.17201C2.84501 7.36201 2.02502 6.4537 1.63351 5.9981C2.01625 5.53083 2.83628 4.6224 3.92306 3.81583C5.06351 2.96943 6.48657 2.24347 7.99968 2.24347C9.51274 2.24347 10.9317 2.96936 12.0701 3.81576C13.1557 4.62284 13.9761 5.53202 14.3662 5.99979C13.9762 6.46752 13.1557 7.3767 12.0701 8.18379C10.9317 9.0302 9.51274 9.75611 7.99968 9.75611Z" fill="#545F7D" stroke="#545F7D" stroke-width="0.2"/>
                              <path d="M8.00014 2.90818C6.29675 2.90818 4.9083 4.2967 4.9083 6.00002C4.9083 7.70334 6.29682 9.09186 8.00014 9.09186C9.70346 9.09186 11.092 7.70334 11.092 6.00002C11.092 4.29669 9.70346 2.90818 8.00014 2.90818ZM8.00014 7.88386C6.96726 7.88386 6.11646 7.0324 6.11646 6.00018C6.11646 4.96728 6.96732 4.1165 8.00014 4.1165C9.03296 4.1165 9.88382 4.96736 9.88382 6.00018C9.88382 7.033 9.03296 7.88386 8.00014 7.88386Z" fill="#545F7D" stroke="#545F7D" stroke-width="0.2"/>
                          </svg>,
                      },
                      {
                        text: "Blacklist User",
                        onClick: () => null,
                        icon:
                          // prettier-ignore
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" >
                            <path d="M6.08321 5.78713L6.08358 5.7875H6.125C6.84771 5.7875 7.54087 5.50023 8.05183 4.9893L7.98112 4.91859L8.05183 4.9893C8.56276 4.47837 8.85003 3.78519 8.85003 3.06247C8.85003 2.33974 8.56276 1.64659 8.05183 1.13564L7.98516 1.20231L8.05183 1.13564C7.5409 0.624706 6.84772 0.337439 6.125 0.337439C5.40227 0.337439 4.70913 0.624707 4.19817 1.13563L4.19817 1.13564C3.68724 1.64657 3.39997 2.33974 3.39997 3.06247V3.06255C3.40054 3.78527 3.68838 4.47782 4.19867 4.9887L4.19875 4.98878C4.69979 5.48925 5.37558 5.77575 6.08321 5.78713ZM4.47503 3.06258C4.47606 2.15406 5.20966 1.41783 6.11717 1.41249H6.125C6.79221 1.41249 7.39395 1.81469 7.64919 2.43084L7.64921 2.43087C7.90495 3.04756 7.76367 3.7576 7.29189 4.22935L7.3626 4.30007L7.29189 4.22936C6.8201 4.70114 6.11009 4.84242 5.49341 4.58668L5.49337 4.58666C4.87725 4.33145 4.47507 3.72976 4.47503 3.06258ZM1.36976 13.5052C1.47065 13.6061 1.60769 13.6625 1.74999 13.6625H10.5C10.6423 13.6625 10.7793 13.6061 10.8802 13.5052C10.9811 13.4043 11.0375 13.2673 11.0375 13.125L11.0375 11.375L11.0375 11.3749C11.0358 10.0725 10.5178 8.82375 9.5973 7.90272L9.59726 7.90268C8.67619 6.98218 7.4274 6.46421 6.12512 6.4625L6.12504 6.52398L6.125 6.46249H6.12499L6.12495 6.52296L6.12487 6.4625C4.82254 6.46417 3.57375 6.98219 2.65273 7.90268L2.65269 7.90273C1.73218 8.82379 1.21421 10.0726 1.2125 11.3749V11.375V13.125C1.2125 13.2673 1.26887 13.4043 1.36976 13.5052ZM9.96249 12.5875H2.2875V11.375C2.2875 10.0041 3.01876 8.73726 4.20617 8.0519L4.2062 8.05189C5.39368 7.36594 6.85619 7.36594 8.04366 8.05189L8.04369 8.0519C9.23117 8.73731 9.96236 10.0043 9.96236 11.375L9.96249 12.5875ZM12.2446 6.23463L11.6974 5.68751L12.2452 5.1397L12.2452 5.13971L12.2464 5.13854C12.4507 4.92746 12.4472 4.59222 12.2404 4.3848L12.2402 4.38457C12.0328 4.1778 11.6975 4.17427 11.4865 4.37863L11.4853 4.37976L10.9375 4.92757L10.3897 4.37976L10.3897 4.37975L10.3885 4.37863C10.1774 4.17426 9.84221 4.17782 9.63479 4.38457L9.63456 4.3848C9.42779 4.59222 9.42426 4.92746 9.62861 5.13854L9.6286 5.13855L9.62975 5.1397L10.1776 5.68751L9.62975 6.23532L9.62974 6.23531L9.62862 6.23647C9.42425 6.44756 9.4278 6.78279 9.63456 6.99022L9.63478 6.99044C9.84221 7.19721 10.1774 7.20074 10.3885 6.99639L10.3885 6.9964L10.3897 6.99525L10.9375 6.44744L11.4847 6.99461C11.5848 7.09837 11.7223 7.15718 11.8663 7.15852C12.0101 7.15986 12.1491 7.10283 12.2507 7.00076C12.3528 6.8992 12.4099 6.76017 12.4085 6.61626C12.4072 6.47227 12.3484 6.33478 12.2446 6.23463Z" fill="#545F7D" stroke="#545F7D" stroke-width="0.2"/>
                          </svg>,
                      },
                      {
                        text: "Activate User",
                        onClick: () => null,
                        icon:
                          // prettier-ignore
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" >
                            <g clip-path="url(#clip0_5530_2525)">
                            <path d="M4.98844 6.61042L4.9883 6.61032C4.16917 5.99661 3.6376 5.01997 3.6376 3.91777C3.6376 2.10402 5.07433 0.625678 6.87097 0.557898L6.87143 0.554956H6.99998C8.85641 0.554956 10.3613 2.06095 10.3613 3.91726C10.3613 5.01894 9.82975 5.99541 9.01128 6.60916C9.01126 6.60917 9.01124 6.60919 9.01122 6.60921L8.8311 6.74442L9.04517 6.81481C9.04518 6.81481 9.04519 6.81482 9.0452 6.81482C9.86977 7.08578 10.6377 7.52127 11.3015 8.10107L11.3015 8.10111C11.4683 8.24689 11.4846 8.49091 11.3393 8.65726L11.339 8.65759C11.1928 8.82395 10.9489 8.83881 10.7831 8.69395L10.8818 8.58099L10.7831 8.69395C9.77092 7.80959 8.48183 7.30916 7.13928 7.27625H7.12745L7.12248 7.27643C7.08099 7.27795 7.03809 7.27953 6.99838 7.27953C6.95946 7.27953 6.91838 7.27801 6.87793 7.27652L6.8704 7.27625H6.85909C4.2063 7.34106 1.91033 9.24287 1.36801 11.8468L1.36796 11.8471C1.32757 12.0393 1.37682 12.2406 1.50067 12.3934L1.5188 12.4157C1.60005 12.5064 1.7639 12.6326 2.00101 12.6326H6.51279C6.73367 12.6326 6.9067 12.8061 6.9067 13.027C6.9067 13.2492 6.733 13.4209 6.51279 13.4209H2.00101C1.56642 13.4209 1.16332 13.2288 0.889327 12.892L0.889302 12.892C0.613527 12.5528 0.507874 12.1163 0.597436 11.6872L4.98844 6.61042ZM4.98844 6.61042L5.16885 6.74525M4.98844 6.61042L5.16885 6.74525M7.86128 11.061L7.96602 10.9537L7.96608 10.9537C7.9661 10.9538 7.96613 10.9538 7.96615 10.9538L9.59842 12.5462L9.60673 12.5543L9.60695 12.5546C9.71302 12.6487 9.83815 12.6606 9.90482 12.6559L9.90539 12.6559C9.97132 12.6515 10.0909 12.6244 10.1837 12.5199L12.7175 8.98412L12.7176 8.98398C12.781 8.89585 12.8717 8.84017 12.9732 8.82387L13.0491 8.81167L13.0571 8.81973L9.94875 13.4437L9.95862 13.443C10.2896 13.4212 10.6004 13.2595 10.8092 13.0015L10.8046 13.0062L10.8029 13.0078L10.8019 13.0068M7.86128 11.061C7.76284 10.9648 7.613 10.967 7.51621 11.066C7.41996 11.1644 7.4216 11.3137 7.52003 11.4105L9.15523 13.0062C9.34992 13.1916 9.61133 13.295 9.8793 13.295C9.9061 13.295 9.92852 13.295 9.94711 13.2933M7.86128 11.061L9.49368 12.6535M7.86128 11.061L9.49368 12.6535M9.94711 13.2933V13.4433H9.94875V13.4436C9.95207 13.4434 9.95536 13.4432 9.95861 13.4429C9.95918 13.4428 9.95974 13.4428 9.9603 13.4427L9.95359 13.3667L9.94875 13.3119L9.94711 13.2933ZM9.94711 13.2933H9.94875C10.1958 13.277 10.4305 13.1713 10.6075 13.0001C10.6241 13.0151 10.6423 13.0284 10.6566 13.035C10.6809 13.041 10.7225 13.0417 10.7389 13.0388C10.7494 13.0359 10.7664 13.0294 10.773 13.0262C10.7855 13.0198 10.7941 13.0131 10.7972 13.0107C10.7989 13.0093 10.8005 13.008 10.8019 13.0068M10.8019 13.0068C10.8025 13.0063 10.8031 13.0057 10.8037 13.0053C10.8046 13.0044 10.8054 13.0037 10.806 13.0031C10.8084 13.0009 10.8104 12.9989 10.8118 12.9975C10.8124 12.9969 10.8128 12.9964 10.8132 12.9961L10.8146 12.9945L10.8152 12.9939L10.8159 12.9931L10.8169 12.9918L10.7443 12.9373L10.71 12.9116L10.6969 12.9018L10.7105 12.9154L10.7147 12.9196L10.8019 13.0068ZM9.49368 12.6535L9.49532 12.6557C9.64407 12.7957 9.8218 12.8121 9.91532 12.8056C10.0061 12.7996 10.1729 12.7624 10.3014 12.6131L9.49368 12.6535ZM5.16885 6.74525L4.95422 6.81591C4.95422 6.81591 4.95422 6.81591 4.95422 6.81591C4.19092 7.06717 3.47392 7.45838 2.84687 7.97401C1.69729 8.91932 0.899155 10.2389 0.59745 11.6872L5.16885 6.74525ZM4.42376 4.03523V3.91725C4.42376 2.50179 5.5796 1.34523 6.99471 1.34327L6.99471 1.34329H6.99881C8.41557 1.34329 9.57335 2.5001 9.57335 3.91727C9.57335 5.2906 8.48741 6.4205 7.12966 6.48821L7.12964 6.48794L7.12056 6.48895L7.11906 6.48911C7.07768 6.48803 7.03776 6.48748 6.99932 6.48748C6.97359 6.48748 6.94583 6.48798 6.91902 6.48847C6.90572 6.48871 6.89265 6.48895 6.88018 6.48912H6.87965L6.87807 6.48895L6.8781 6.48867L6.86894 6.48821C5.60286 6.42537 4.60496 5.42448 4.47602 4.16989L4.46218 4.03523H4.42376Z" fill="#545F7D" stroke="#545F7D" stroke-width="0.3"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_5530_2525">
                            <rect width="14" height="14" fill="white"/>
                            </clipPath>
                            </defs>
                          </svg>,
                      },
                    ]}
                  >
                    <button className="dropdown-toggle">
                      {/* prettier-ignore */}
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <g clip-path="url(#clip0_5530_2392)">
                          <path d="M10.0002 6.1111C10.9224 6.1111 11.6668 5.36666 11.6668 4.44444C11.6668 3.52222 10.9224 2.77777 10.0002 2.77777C9.07794 2.77777 8.3335 3.52222 8.3335 4.44444C8.3335 5.36666 9.07794 6.1111 10.0002 6.1111ZM10.0002 8.33333C9.07794 8.33333 8.3335 9.07777 8.3335 9.99999C8.3335 10.9222 9.07794 11.6667 10.0002 11.6667C10.9224 11.6667 11.6668 10.9222 11.6668 9.99999C11.6668 9.07777 10.9224 8.33333 10.0002 8.33333ZM10.0002 13.8889C9.07794 13.8889 8.3335 14.6333 8.3335 15.5555C8.3335 16.4778 9.07794 17.2222 10.0002 17.2222C10.9224 17.2222 11.6668 16.4778 11.6668 15.5555C11.6668 14.6333 10.9224 13.8889 10.0002 13.8889Z" fill="#545F7D"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_5530_2392">
                          <rect width="20" height="20" fill="white"/>
                          </clipPath>
                          </defs>
                      </svg>
                    </button>
                  </Dropdown>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default UserTable;
