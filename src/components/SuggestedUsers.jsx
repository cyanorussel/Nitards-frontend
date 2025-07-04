import { Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SuggestedUser from "./SuggestedUser";
import useShowToast from "../hooks/useShowToast";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const SuggestedUsers = () => {
	const [suggestedUsers, setSuggestedUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const showToast = useShowToast();
	const navigate = useNavigate();

	useEffect(() => {
		const getSuggestedUsers = async () => {
			setLoading(true);
			try {
				const res = await fetch(`${API_BASE_URL}/api/users/suggested`, {
					credentials: "include",
				});
				if (res.status === 401) {
					showToast("Unauthorized", "Please log in to see suggestions.", "error");
					navigate("/auth");
					return;
				}
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					setSuggestedUsers([]);
					return;
				}
				if (!Array.isArray(data)) {
					setSuggestedUsers([]);
					return;
				}
				setSuggestedUsers(data);
			} catch (error) {
				showToast("Error", error.message, "error");
				setSuggestedUsers([]);
			} finally {
				setLoading(false);
			}
		};

		getSuggestedUsers();
	}, [showToast, navigate]);

	return (
		<>
			<Text mb={4} fontWeight={"bold"}>
				Suggested Users
			</Text>
			<Flex direction={"column"} gap={4}>
				{Array.isArray(suggestedUsers) &&
					!loading &&
					suggestedUsers.map((user) => <SuggestedUser key={user._id} user={user} />)}
				{loading &&
					[0, 1, 2, 3, 4].map((_, idx) => (
						<Flex key={idx} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
							{/* avatar skeleton */}
							<Box>
								<SkeletonCircle size={"10"} />
							</Box>
							{/* username and fullname skeleton */}
							<Flex w={"full"} flexDirection={"column"} gap={2}>
								<Skeleton h={"8px"} w={"80px"} />
								<Skeleton h={"8px"} w={"90px"} />
							</Flex>
							{/* follow button skeleton */}
							<Flex>
								<Skeleton h={"20px"} w={"60px"} />
							</Flex>
						</Flex>
					))}
			</Flex>
		</>
	);
};

export default SuggestedUsers;

// Loading skeletons for suggested users, if u want to copy and paste as shown in the tutorial

// <Flex key={idx} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
// 							{/* avatar skeleton */}
// 							<Box>
// 								<SkeletonCircle size={"10"} />
// 							</Box>
// 							{/* username and fullname skeleton */}
// 							<Flex w={"full"} flexDirection={"column"} gap={2}>
// 								<Skeleton h={"8px"} w={"80px"} />
// 								<Skeleton h={"8px"} w={"90px"} />
// 							</Flex>
// 							{/* follow button skeleton */}
// 							<Flex>
// 								<Skeleton h={"20px"} w={"60px"} />
// 							</Flex>
// 						</Flex>
