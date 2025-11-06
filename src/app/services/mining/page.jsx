import MiningClient from '../../../components/services/MiningClient';
import { useT } from '../../../lib/ruMessages';
import './page.css';

export const metadata = { title: 'Mining | CIS ENERGY' };

export default function MiningPage() {
  return <MiningClient />;
}
