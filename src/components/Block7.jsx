'use client';
import Image from 'next/image';
import { useT } from '../lib/ruMessages';
import '../app/styles/b7.css';

export default function Block7() {
  const t = useT('Block7');
  return (
    <section className="b7" id="block7">
      <div className="b7__inner">
        <h2 className="b7__title">{t('title')}</h2>

        <Image
          className="b7__img"
          src="/images/block7_1920.png"
          alt=""
          width={1920}
          height={600}
          sizes="100vw"
        />
      </div>
    </section>
  );
}
