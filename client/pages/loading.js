import Image from 'next/image';
import { Circle } from 'better-react-spinkit';


function Loading() {
  return (
    <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <div>
        <Image
          src="https://commons.wikimedia.org/wiki/File:WhatsApp.svg"
          alt="whatsapp"
          style={{ marginBottom: 10 }}
          height={200}
          width={200}
        />
        <Circle color="#3CBC28" size={60} />
      </div>
    </center>
  );
}

export default Loading;