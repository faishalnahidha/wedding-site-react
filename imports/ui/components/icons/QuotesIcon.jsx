import * as React from 'react';

function QuotesIcon(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 40 40" fill="none" {...props}>
      <defs>
        <linearGradient id="a" x1="0%" y1="2.469%" y2="97.531%">
          <stop offset="0%" stopColor="#4568DC" />
          <stop offset="100%" stopColor="#B06AB3" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.344 5.156h35.312A2.347 2.347 0 0140 7.5v21.886a2.347 2.347 0 01-2.344 2.344h-14.14a.781.781 0 010-1.563h14.14c.431 0 .782-.35.782-.782V7.5a.782.782 0 00-.782-.782H2.344c-.431 0-.782.351-.782.782v25.572c0 .095.034.156.103.189.042.02.156.053.3-.066l3.444-2.848a.781.781 0 01.498-.18h10.577a.781.781 0 110 1.563H6.188L2.96 34.4a1.89 1.89 0 01-1.204.444A1.747 1.747 0 010 33.071V7.502a2.347 2.347 0 012.344-2.345zm9.372 6.256h4.732c1.3 0 2.358 1.058 2.358 2.358v4.764c0 1.906 0 5.095-2.61 6.603-.39.225-.801.336-1.194.336-.514 0-.999-.19-1.37-.562-.646-.645-.755-1.64-.272-2.476.361-.626.473-1.2.32-1.575h-1.963a2.361 2.361 0 01-2.359-2.358V13.77c0-1.3 1.058-2.358 2.358-2.358zm3.699 12.371c1.829-1.056 1.829-3.48 1.829-5.249V13.77a.797.797 0 00-.796-.796h-4.731a.797.797 0 00-.796.796v4.731c0 .44.357.796.796.796h2.365c.207 0 .406.083.553.23.877.876.906 2.255.078 3.69-.153.264-.088.478.023.59.149.148.396.14.678-.023zm10.1-2.923c.153.376.042.949-.32 1.575-.482.836-.373 1.831.272 2.476.372.372.857.562 1.37.562.393 0 .804-.11 1.194-.336 2.611-1.508 2.611-4.697 2.61-6.603V13.77c0-1.3-1.057-2.358-2.357-2.358h-4.732a2.361 2.361 0 00-2.358 2.358v4.731c0 1.3 1.058 2.359 2.358 2.359h1.963zm-2.759-2.358V13.77c0-.439.357-.796.796-.796h4.732c.438 0 .796.357.796.796v4.764c0 1.77 0 4.193-1.83 5.25-.282.163-.53.171-.678.022-.112-.111-.176-.325-.023-.59.828-1.434.798-2.813-.079-3.69a.781.781 0 00-.552-.229h-2.366a.797.797 0 01-.796-.796zM20 30.168H20a.781.781 0 11.001 1.562.781.781 0 01-.002-1.562z"
        fill="url('#a')"
      />
    </svg>
  );
}

const MemoQuotesIcon = React.memo(QuotesIcon);
export default MemoQuotesIcon;