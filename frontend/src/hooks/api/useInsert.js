import useAsync from '../useAsync';
import * as api from '../../services/participants/insertApi';

export default function useInsertParticipants() {
  const {
    loading: participantsInsertLoading,
    error: participantsInsertError,
    act: insertParticipants,
  } = useAsync(api.insertParticipantsApi, false);

  return {
    participantsInsertLoading,
    participantsInsertError,
    insertParticipants
  };
}