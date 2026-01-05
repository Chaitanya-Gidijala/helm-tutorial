# Kubernetes Cheat Sheet

## Pod Management (Pod.yaml)


kubectl apply -f pod.yaml                   Create/Update pod
kubectl get pods                            List pods in current namespace
kubectl get pods -A                         List pods in ALL namespaces
kubectl get pods -o wide                    List with detailed info (IP, Node)
kubectl describe pod <pod-name>             View detailed state and events
kubectl logs <pod-name>                     View logs
kubectl logs <pod-name> -f                  Stream logs (live tail)
kubectl logs <pod-name> -c <container>      Logs for a specific container
kubectl port-forward <pod-name> 8080:80     Forward local port 8080 to pod port 80
kubectl exec -it <pod-name> -- /bin/bash    Execute interactive shell inside pod
kubectl delete pod <pod-name>               Delete a pod

-----------------------------------------

## Deployment Management (deployment.yaml)

kubectl apply -f deployment.yaml                    Create/Update deployment
kubectl get deployments                             List deployments
kubectl get rs                                      List ReplicaSets
kubectl describe deployment <name>                  Deployment details
kubectl scale deployment <name> --replicas=5        Scale to 5 replicas
kubectl set image deployment/<name> <container>=<image>:<tag> Update image
kubectl rollout status deployment <name>            Check update status
kubectl rollout history deployment <name>           View update history
kubectl rollout undo deployment <name>              Rollback to previous version
kubectl delete deployment <name>                    Delete deployment

-----------------------------------------

## Service Management (service.yaml)

kubectl apply -f service.yaml               Create/Update service
kubectl get svc                             List services
kubectl get svc -o wide                     List with external IP/Port info
kubectl describe svc <name>                 Service details & endpoints
kubectl delete svc <name>                   Delete service
minikube service <name>                     Open minikube service in browser

------------------------------------------

## Namespaces & Contexts

kubectl get ns                              List namespaces
kubectl create ns <name>                    Create a new namespace
kubectl config get-contexts                 List all available contexts
kubectl config current-context              Show current context
kubectl config set-context --current --namespace=<name> Switch current namespace

------------------------------------------  

## Node & Cluster Information

kubectl get nodes                           List nodes
kubectl describe node <node-name>           Node resource usage & status

------------------------------------------

## Monitoring & Troubleshooting

kubectl top node                            Show CPU/Memory usage per Node
kubectl top pod                             Show CPU/Memory usage per Pod
kubectl get events --sort-by='.lastTimestamp' Show recent cluster events
kubectl auth can-i <verb> <resource>        Check RBAC permissions
kubectl get all                             Show everything in current namespace

------------------------------------------

## ConfigMaps & Secrets

kubectl get cm                              List ConfigMaps
kubectl get secret                          List Secrets
kubectl describe cm <name>                  View ConfigMap data
kubectl get secret <name> -o yaml           View Secret (encoded)

------------------------------------------

## Helm (Package Manager)

helm list                                   List all releases
helm install <release-name> <chart-path>    Install a chart
helm upgrade <release-name> <chart-path>    Update a release
helm rollback <release-name> <revision>     Rollback to specific version
helm uninstall <release-name>               Delete a release
helm template <chart-path>                  Preview generated manifests
