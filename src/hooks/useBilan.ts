// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { Bilan, BilanType, SubBilanType } from "@prisma/client";
// import { getBilan } from "@/actions/bilan/getBilan";

// export default function useBilan(type: BilanType, subType: SubBilanType) {
//   const queryClient = useQueryClient();

//   const previousData = queryClient.getQueryData<Bilan[]>(["bilan"]);

//   return useQuery({
//     queryKey: ["bilan", type, subType],
//     queryFn: () => getBilan(type, subType),
//     // placeholderData: previousData,
//   });
// }
