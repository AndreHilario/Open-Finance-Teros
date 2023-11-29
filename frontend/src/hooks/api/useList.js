import useAsync from '../useAsync';
import * as api from '../../services/participants/listApi';

export default function useListParticipants() {
  const {
    loading: participantsListLoading,
    error: participantsListError,
    act: listParticipants,
  } = useAsync(api.listParticipantsApi, false);

  return {
    participantsListLoading,
    participantsListError,
    listParticipants
  };
}