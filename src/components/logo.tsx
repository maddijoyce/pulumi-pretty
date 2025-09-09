import aws from "../logos/aws.svg";
import apigatewayv2 from "../logos/api-gateway.svg";
import cloudfront from "../logos/cloudfront.svg";
import awsDark from "../logos/aws-dark.svg";
import dynamodb from "../logos/dynamodb.svg";
import scheduler from "../logos/scheduler.svg";
import sesv2 from "../logos/ses.svg";
import ec2 from "../logos/ec2.svg";
import lambda from "../logos/lambda.svg";
import ecr from "../logos/ecr.svg";
import ecs from "../logos/ecs.svg";
import sns from "../logos/sns.svg";
import sqs from "../logos/sqs.svg";
import docker from "../logos/docker.svg";
import iot from "../logos/iot.svg";
import cloudwatch from "../logos/cloudwatch.svg";
import iam from "../logos/iam.svg";
import route53 from "../logos/route53.svg";
import pulumi from "../logos/pulumi.svg";
import acm from "../logos/acm.svg";
import s3 from "../logos/s3.svg";
import { useMedia } from "../utils/media";
import { Text } from "./text";

const logos: Record<string, string> = {
  acm,
  apigatewayv2,
  aws,
  cloudfront,
  cloudwatch,
  docker,
  dynamodb,
  ec2,
  ecr,
  ecs,
  iam,
  iot,
  lambda,
  pulumi,
  route53,
  s3,
  scheduler,
  sesv2,
  sns,
  sqs,
};

const darkLogos: Record<string, string> = {
  aws: awsDark,
};

export const Logo = ({
  item,
  className,
}: {
  item?: string;
  className?: string;
}) => {
  const { isDark } = useMedia();

  if (!item) return null;
  const src = (isDark && darkLogos[item]) || logos[item];
  if (!src) return <Text>{item}</Text>;

  return <img src={src} alt={item} className={className || "size-4"} />;
};
