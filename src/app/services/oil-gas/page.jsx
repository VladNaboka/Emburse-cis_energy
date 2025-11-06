import OilGasClient from '../../../components/services/OilGasClient';
import { useT } from '../../../lib/ruMessages';
import './page.css';

export const metadata = {
  title: 'Oil & Gas | CIS ENERGY',
};

export default function OilGasPage() {
  return <OilGasClient />;
}
