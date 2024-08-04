import React from "react";
import { themeDarkMode } from "../../themes/ThemeProvider";
interface IconProps {
  color?: string;
  width?: string;
  height?: string;
}

export const HomeIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z"
          fill={color}
        />
      </svg>
    </>
  );
};

export const ExploreIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <g id="Layer_2" data-name="Layer 2">
          <g id="invisible_box" data-name="invisible box">
            <rect width="48" height="48" fill="none" />
          </g>
          <g id="icons_Q2" data-name="icons Q2">
            <path
              d="M24,6A18,18,0,1,1,6,24,18.1,18.1,0,0,1,24,6m0-4A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2Z"
              fill={color}
            />
            <path
              d="M33.3,13.3,20,20,13.3,33.3a1.1,1.1,0,0,0,1.4,1.4L28,28l6.7-13.3A1.1,1.1,0,0,0,33.3,13.3ZM24,26a2,2,0,1,1,2-2A2,2,0,0,1,24,26Z"
              fill={color}
            />
          </g>
        </g>
      </svg>
    </>
  );
};

export const SearchIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export const BookmarkedIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg
        stroke={color}
        fill={color}
        strokeWidth="0"
        viewBox="0 0 16 16"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"></path>
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
      </svg>
    </>
  );
};

export const HistoryIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg
        stroke={color}
        fill={color}
        strokeWidth="0"
        viewBox="0 0 1024 1024"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg">
        <path d="M536.1 273H488c-4.4 0-8 3.6-8 8v275.3c0 2.6 1.2 5 3.3 6.5l165.3 120.7c3.6 2.6 8.6 1.9 11.2-1.7l28.6-39c2.7-3.7 1.9-8.7-1.7-11.2L544.1 528.5V281c0-4.4-3.6-8-8-8zm219.8 75.2l156.8 38.3c5 1.2 9.9-2.6 9.9-7.7l.8-161.5c0-6.7-7.7-10.5-12.9-6.3L752.9 334.1a8 8 0 0 0 3 14.1zm167.7 301.1l-56.7-19.5a8 8 0 0 0-10.1 4.8c-1.9 5.1-3.9 10.1-6 15.1-17.8 42.1-43.3 80-75.9 112.5a353 353 0 0 1-112.5 75.9 352.18 352.18 0 0 1-137.7 27.8c-47.8 0-94.1-9.3-137.7-27.8a353 353 0 0 1-112.5-75.9c-32.5-32.5-58-70.4-75.9-112.5A353.44 353.44 0 0 1 171 512c0-47.8 9.3-94.2 27.8-137.8 17.8-42.1 43.3-80 75.9-112.5a353 353 0 0 1 112.5-75.9C430.6 167.3 477 158 524.8 158s94.1 9.3 137.7 27.8A353 353 0 0 1 775 261.7c10.2 10.3 19.8 21 28.6 32.3l59.8-46.8C784.7 146.6 662.2 81.9 524.6 82 285 82.1 92.6 276.7 95 516.4 97.4 751.9 288.9 942 524.8 942c185.5 0 343.5-117.6 403.7-282.3 1.5-4.2-.7-8.9-4.9-10.4z"></path>
      </svg>
    </>
  );
};

export const ProfileIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export const LoginIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 16C8 18.8284 8 20.2426 8.87868 21.1213C9.51998 21.7626 10.4466 21.9359 12 21.9827M8 8C8 5.17157 8 3.75736 8.87868 2.87868C9.75736 2 11.1716 2 14 2H15C17.8284 2 19.2426 2 20.1213 2.87868C21 3.75736 21 5.17157 21 8V10V14V16C21 18.8284 21 20.2426 20.1213 21.1213C19.3529 21.8897 18.175 21.9862 16 21.9983"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M3 9.5V14.5C3 16.857 3 18.0355 3.73223 18.7678C4.46447 19.5 5.64298 19.5 8 19.5M3.73223 5.23223C4.46447 4.5 5.64298 4.5 8 4.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 12L15 12M15 12L12.5 14.5M15 12L12.5 9.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export const ClearIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
};

export const GoogleIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg
        stroke={color}
        fill={color}
        strokeWidth="0"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 48 48"
        enableBackground="new 0 0 48 48"
        className={themeDarkMode.textPrimary}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#FFC107"
          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path
          fill="#FF3D00"
          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path
          fill="#4CAF50"
          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path
          fill="#1976D2"
          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
      </svg>
    </>
  );
};

export const FacebookIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <rect width={parseInt(width) + 8} height={parseInt(height) + 8} fill={"#fff"} rx="16" ry="16" />
        <g transform={`translate(2, 2)`}>
          <path
            fill={"#5179ff"}
            d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z"
          />
        </g>
      </svg>
    </>
  );
};

export const EmailIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
          fill={color}
        />
      </svg>
    </>
  );
};

export const PasswordIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill={color}>
        <g id="passwordIcon" data-name="Password Icon">
          <g id="invisible_box" data-name="invisible box">
            <rect width="48" height="48" fill="none" />
          </g>
          <g id="Layer_7" data-name="Layer 7">
            <g>
              <path d="M39,18H35V13A11,11,0,0,0,24,2H22A11,11,0,0,0,11,13v5H7a2,2,0,0,0-2,2V44a2,2,0,0,0,2,2H39a2,2,0,0,0,2-2V20A2,2,0,0,0,39,18ZM15,13a7,7,0,0,1,7-7h2a7,7,0,0,1,7,7v5H15ZM37,42H9V22H37Z" />
              <circle cx="15" cy="32" r="3" />
              <circle cx="23" cy="32" r="3" />
              <circle cx="31" cy="32" r="3" />
            </g>
          </g>
        </g>
      </svg>
    </>
  );
};

export const FirstNameIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.5 21H5.6C5.03995 21 4.75992 21 4.54601 20.891C4.35785 20.7951 4.20487 20.6422 4.10899 20.454C4 20.2401 4 19.9601 4 19.4V17.6841C4 17.0485 4 16.7306 4.04798 16.4656C4.27087 15.2344 5.23442 14.2709 6.46558 14.048C6.5425 14.0341 6.6237 14.0242 6.71575 14.0172C6.94079 14 7.05331 13.9914 7.20361 14.0026C7.35983 14.0143 7.4472 14.0297 7.59797 14.0722C7.74302 14.1131 8.00429 14.2315 8.52682 14.4682C8.83795 14.6091 9.16326 14.7243 9.5 14.811M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7ZM16.4976 16.2119C15.7978 15.4328 14.6309 15.2232 13.7541 15.9367C12.8774 16.6501 12.7539 17.843 13.4425 18.6868C13.8312 19.1632 14.7548 19.9983 15.4854 20.6353C15.8319 20.9374 16.0051 21.0885 16.2147 21.1503C16.3934 21.203 16.6018 21.203 16.7805 21.1503C16.9901 21.0885 17.1633 20.9374 17.5098 20.6353C18.2404 19.9983 19.164 19.1632 19.5527 18.6868C20.2413 17.843 20.1329 16.6426 19.2411 15.9367C18.3492 15.2307 17.1974 15.4328 16.4976 16.2119Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export const LastNameIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.5 21H4C4 17.4735 6.60771 14.5561 10 14.0709M16.4976 16.2119C15.7978 15.4328 14.6309 15.2232 13.7541 15.9367C12.8774 16.6501 12.7539 17.843 13.4425 18.6868C13.8312 19.1632 14.7548 19.9983 15.4854 20.6353C15.8319 20.9374 16.0051 21.0885 16.2147 21.1503C16.3934 21.203 16.6018 21.203 16.7805 21.1503C16.9901 21.0885 17.1633 20.9374 17.5098 20.6353C18.2404 19.9983 19.164 19.1632 19.5527 18.6868C20.2413 17.843 20.1329 16.6426 19.2411 15.9367C18.3492 15.2307 17.1974 15.4328 16.4976 16.2119ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export const IMDBIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="IMDb"
        role="img"
        viewBox="0 0 512 512">
        <rect width="512" height="512" rx="15%" fill="#f5c518" />
        <path d="M104 328V184H64v144zM189 184l-9 67-5-36-5-31h-50v144h34v-95l14 95h25l13-97v97h34V184zM256 328V184h62c15 0 26 11 26 25v94c0 14-11 25-26 25zm47-118l-9-1v94c5 0 9-1 10-3 2-2 2-8 2-18v-56-12l-3-4zM419 220h3c14 0 26 11 26 25v58c0 14-12 25-26 25h-3c-8 0-16-4-21-11l-2 9h-36V184h38v46c5-6 13-10 21-10zm-8 70v-34l-1-11c-1-2-4-3-6-3s-5 1-6 3v57c1 2 4 3 6 3s6-1 6-3l1-12z" />
      </svg>
    </>
  );
};

export const InstagramIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_87_7153)" />
        <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)" />
        <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)" />
        <path
          d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z"
          fill="white"
        />
        <defs>
          <radialGradient
            id="paint0_radial_87_7153"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)">
            <stop stopColor="#B13589" />
            <stop offset="0.79309" stopColor="#C62F94" />
            <stop offset="1" stopColor="#8A3AC8" />
          </radialGradient>
          <radialGradient
            id="paint1_radial_87_7153"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)">
            <stop stopColor="#E0E8B7" />
            <stop offset="0.444662" stopColor="#FB8A2E" />
            <stop offset="0.71474" stopColor="#E2425C" />
            <stop offset="1" stopColor="#E2425C" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint2_radial_87_7153"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)">
            <stop offset="0.156701" stopColor="#406ADC" />
            <stop offset="0.467799" stopColor="#6A45BE" />
            <stop offset="1" stopColor="#6A45BE" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </>
  );
};

export const TiktokIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg fill={color} width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21,2H3A1,1,0,0,0,2,3V21a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2Zm-3.281,8.725h0c-.109.011-.219.016-.328.017A3.571,3.571,0,0,1,14.4,9.129v5.493a4.061,4.061,0,1,1-4.06-4.06c.085,0,.167.008.251.013v2a2.067,2.067,0,1,0-.251,4.119A2.123,2.123,0,0,0,12.5,14.649l.02-9.331h1.914A3.564,3.564,0,0,0,17.719,8.5Z" />
      </svg>
    </>
  );
};

export const TwitterIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" fill="#1DA1F2" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M36 16.3086C35.1177 16.7006 34.1681 16.9646 33.1722 17.0838C34.1889 16.4742 34.9697 15.5095 35.3368 14.36C34.3865 14.9247 33.3314 15.3335 32.2107 15.5551C31.3123 14.5984 30.0316 14 28.6165 14C25.8975 14 23.6928 16.2047 23.6928 18.9237C23.6928 19.3092 23.7368 19.6852 23.8208 20.046C19.7283 19.8412 16.1005 17.8805 13.6719 14.9015C13.2479 15.6287 13.0055 16.4742 13.0055 17.3766C13.0055 19.0845 13.8735 20.5916 15.1958 21.4747C14.3878 21.4491 13.6295 21.2275 12.9647 20.8587V20.9203C12.9647 23.3066 14.663 25.296 16.9141 25.7496C16.5013 25.8616 16.0661 25.9224 15.6174 25.9224C15.2998 25.9224 14.991 25.8912 14.6902 25.8336C15.3166 27.7895 17.1357 29.2134 19.2899 29.2534C17.6052 30.5733 15.4822 31.3612 13.1751 31.3612C12.7767 31.3612 12.3848 31.338 12 31.2916C14.1791 32.6884 16.7669 33.5043 19.5475 33.5043C28.6037 33.5043 33.5562 26.0016 33.5562 19.4956C33.5562 19.282 33.5522 19.0693 33.5418 18.8589C34.5049 18.1629 35.34 17.2958 36 16.3086Z"
          fill={color}
        />
      </svg>
    </>
  );
};

export const YoutubeIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 48 48"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Color-" transform="translate(-200.000000, -368.000000)">
            <path
              fill={"#CE1312"}
              d="M247.52,375.334163 C247.52,375.334163 247.0505,372.003199 245.612,370.536366 C243.7865,368.610299 241.7405,368.601235 240.803,368.489448 C234.086,368 224.0105,368 224.0105,368 L223.9895,368 C223.9895,368 213.914,368 207.197,368.489448 C206.258,368.601235 204.2135,368.610299 202.3865,370.536366 C200.948,372.003199 200.48,375.334163 200.48,375.334163 C200.48,375.334163 200,379.246723 200,383.157773 L200,386.82561 C200,390.73817 200.48,394.64922 200.48,394.64922 C200.48,394.64922 200.948,397.980184 202.3865,399.447016 C204.2135,401.373084 206.612,401.312658 207.68,401.513574 C211.52,401.885191 224,402 224,402 C224,402 234.086,401.984894 240.803,401.495446 C241.7405,401.382148 243.7865,401.373084 245.612,399.447016 C247.0505,397.980184 247.52,394.64922 247.52,394.64922 C247.52,394.64922 248,390.73817 248,386.82561 L248,383.157773 C248,379.246723 247.52,375.334163 247.52,375.334163 L247.52,375.334163 Z"></path>
            <path
              fill={"#FFFFFF"}
              d="M219.044,391.269916 L219.0425,377.687742 L232.0115,384.502244 L219.044,391.269916 Z"></path>
          </g>
        </g>
      </svg>
    </>
  );
};

export const WikiIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 400 400">
        <path
          fill={color}
          d="m36.092 2.472 0 274.978 163.267 78.084 162.982-78.027 0-274.865-164.863 80.565zm-36.092 34.837 0 263.376 200.527 96.843 199.473-98.154 0-260.81-21.894 0 0 247.24-177.806 87.406-178.405-86.409 0-249.492zm340.446 0.397 0 225.887-130.283 61.863 0-223.265zm-282.46 0.17 130.283 64.315 0 223.265-130.283-61.806z"
        />
      </svg>
    </>
  );
};

export const EditIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export const SendIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export const HeartIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 1024 1024"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg">
        <path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"></path>
      </svg>
    </>
  );
};

export const ShareIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="-1 0 26 26"
        fill="currentColor"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-314.000000, -728.000000)" fill="currentColor">
            <path d="M333,744 C331.23,744 329.685,744.925 328.796,746.312 L323.441,743.252 C323.787,742.572 324,741.814 324,741 C324,740.497 323.903,740.021 323.765,739.563 L329.336,736.38 C330.249,737.37 331.547,738 333,738 C335.762,738 338,735.762 338,733 C338,730.238 335.762,728 333,728 C330.238,728 328,730.238 328,733 C328,733.503 328.097,733.979 328.235,734.438 L322.664,737.62 C321.751,736.631 320.453,736 319,736 C316.238,736 314,738.238 314,741 C314,743.762 316.238,746 319,746 C320.14,746 321.179,745.604 322.02,744.962 L328.055,748.46 C328.035,748.64 328,748.814 328,749 C328,751.762 330.238,754 333,754 C335.762,754 338,751.762 338,749 C338,746.238 335.762,744 333,744"></path>
          </g>
        </g>
      </svg>
    </>
  );
};

export const ThreeDotIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        version="1.1"
        fill="currentColor"
        id="_x32_"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xmlSpace="preserve">
        <style type="text/css">{`.st0 { fill: "currentColor"; }`}</style>
        <g>
          <circle className="st0" cx="55.091" cy="256" r="55.091" />
          <circle className="st0" cx="256" cy="256" r="55.091" />
          <circle className="st0" cx="456.909" cy="256" r="55.091" />
        </g>
      </svg>
    </>
  );
};

export const SelectAllIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path
            d="M3 9V19.4C3 19.9601 3 20.2399 3.10899 20.4538C3.20487 20.642 3.35774 20.7952 3.5459 20.8911C3.7596 21 4.0395 21 4.59846 21H15.0001M17 8L13 12L11 10M7 13.8002V6.2002C7 5.08009 7 4.51962 7.21799 4.0918C7.40973 3.71547 7.71547 3.40973 8.0918 3.21799C8.51962 3 9.08009 3 10.2002 3H17.8002C18.9203 3 19.4801 3 19.9079 3.21799C20.2842 3.40973 20.5905 3.71547 20.7822 4.0918C21.0002 4.51962 21.0002 5.07969 21.0002 6.19978L21.0002 13.7998C21.0002 14.9199 21.0002 15.48 20.7822 15.9078C20.5905 16.2841 20.2842 16.5905 19.9079 16.7822C19.4805 17 18.9215 17 17.8036 17H10.1969C9.07899 17 8.5192 17 8.0918 16.7822C7.71547 16.5905 7.40973 16.2842 7.21799 15.9079C7 15.4801 7 14.9203 7 13.8002Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </>
  );
};

export const CancelIcon: React.FC<IconProps> = ({ color = themeDarkMode.title, width = "20", height = "20" }) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.5001 6H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9.5 11L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14.5 11L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
};
